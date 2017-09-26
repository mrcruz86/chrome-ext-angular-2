import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { Company } from './company';
import { Site } from './site';

import { AuthService } from '../auth/auth.service';
import { PubnubService } from '../pubnub/pubnub.service';

@Injectable()
export class CompanyService {

  token : string;
  userId : string;
  headers : Headers;
  options : RequestOptions;
  company : Subject<Company> = new BehaviorSubject<Company>(null);
  site : Subject<Site> = new BehaviorSubject<Site>(null);

  constructor(private authService : AuthService, private pubnubService : PubnubService, private http : Http) {
    authService.authToken.subscribe( (authToken : string) => {
      this.token = authToken;
      this.headers = new Headers({ 'Authorization' : 'Bearer ' + this.token});
      this.options = new RequestOptions({ headers: this.headers });
    });
    authService.userId.subscribe( (userId : string) => {
      this.userId = userId;
    });
  }

  watchCompany (companyId) : Observable<Response> {
    return this.http.post('https://api-test.intricately.com/api/v1/companies/' + companyId + '/watch',
    {},
    this.options);
  }

  unwatchCompany (companyId) : Observable<Response> {
    return this.http.delete('https://api-test.intricately.com/api/v1/companies/' + companyId + '/watch',
    this.options);
  }

  getWatchedCompany (companyId) : Observable<Response> {
    return this.http.request('https://api-test.intricately.com/api/v1/companies/' + companyId + '/watch',
    this.options);
  }

  getCompanyVendorInfo (companyId, serviceId, vendorId) : Observable<Response> {
    return this.http.request('https://api-test.intricately.com/api/v1/companies/' + companyId + '/services/' + serviceId + '/vendors/' + vendorId,
    this.options);
  }

  getCompanyByUrl (url) : Observable<Response> {
    console.log('requesting company by URL', url);
    return this.http.request('https://api-test.intricately.com/api/v1/companies?domain=' + url + '&redirect=false&chrome=true', this.options);
  }

  getDomainInfo (domain) : Observable<Response> {
    console.log('requesting domain info by domain', domain);
    return this.http.request('https://api-test.intricately.com/api/v1/domains/' + domain, this.options);
  }

  setCompany (url) : any {
    return this.getCompanyByUrl(url).map((res: Response) => {
      console.log(res.json());
      if (res.json().companies && res.json().companies[0].summary.company_not_found) {
        let tempCompany = Object.assign(res.json().companies[0], { name: url, traffic_distribution: null });
        this.site.next(new Site({
          company: tempCompany,
          report: {
            status_code: 1
          }
        }));
        let temp = res.url;
        return temp.slice(temp.indexOf('=') + 1, temp.indexOf('&'));
      } else {
        return res.json().company;
      }
    }).flatMap((c: any) => {
      if (typeof c === 'string') {
        return this.getDomainInfo(c);
      } else {
        let temp = new Company(c);
        this.company.next(temp);
      }
    }).subscribe((res: Response) => {
      console.log(res);
      if (res.json().type === 'site') {
        let r = res.json();
        let temp = new Company(r.site.company);
        Object.assign(r.site.company, temp);
        let tempSite = new Site(r.site);
        let updatedSite = this.site;
        this.site.next(tempSite);
        this.pubnubService.addListener({
          message: function(m) {
            console.log(m);
            if (m.message.type === 'site') {
              let update = new Company(m.message.site.company);
              Object.assign(r.site.company, update);
              console.log(update);
              let tempSite = new Site(r.site);
              updatedSite.next(tempSite);
            }
          }
        });
        this.pubnubService.subscribe(this.userId);
      } else {
        return;
      }

    });
  }

}
