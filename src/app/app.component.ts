import { Component, OnInit, NgZone } from '@angular/core';
import { NgIf } from '@angular/common';
import { Response } from '@angular/http';

import { WindowService } from './common/window/window.service';

import { environment } from '../environments/environment';

import { User } from './common/user/user';
import { Company } from './common/company/company';
import { Site } from './common/company/site';

import { AuthService } from './common/auth/auth.service';
import { UserService } from './common/user/user.service';
import { CompanyService } from './common/company/company.service';
import { MixpanelService } from './common/mixpanel/mixpanel.service';
import { PendoService } from './common/pendo/pendo.service';
import { IntercomService } from './common/intercom/intercom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WindowService, AuthService, CompanyService, UserService, MixpanelService, PendoService, IntercomService]
})
export class AppComponent implements OnInit{

  company : Company;
  site : Site;
  user: User;
  services : Array<Object>;
  traffic : Object;
  auth : boolean = false;
  env : Object;
  isLoading: boolean = true;
  chromeRef : any;
  zoneRef : any;
  windowRef : any;

  constructor (
    private windowService : WindowService,
    private authService : AuthService,
    private userService : UserService,
    private companyService : CompanyService,
    private zone : NgZone,
    private mixpanelService : MixpanelService,
    private pendoService : PendoService,
    private intercomService : IntercomService
  ) {
    chrome.storage.sync.get('tabState', function (items) {
      console.log(items);
      if (Object.keys(items).length < 1) {
        let tabState = {
          'hosting': { 'tab_open' : true },
          'saas': { 'tab_open' : true },
          'dns': { 'tab_open' : true },
          'ddos': { 'tab_open' : true },
          'gtm': { 'tab_open' : true },
          'ovp': { 'tab_open' : true },
          'apm': { 'tab_open' : true },
          'cdn': { 'tab_open' : true },
        }

        chrome.storage.sync.set({'tabState': tabState}, function() {
          console.log('set inital tab state');
        });
      }
    });

    let vm = this;
    vm.chromeRef = chrome;
    vm.zoneRef = zone;
    vm.windowRef = windowService.nativeWindow;

    this.env = environment;
    if (vm.chromeRef.cookies) {
      vm.chromeRef.cookies.get({
        url: environment.url,
        name: 'session'
      }, function(res) {
        if (res !== null) {
          zone.run(() => {
            this.auth = true;
            let session = JSON.parse(decodeURIComponent(res.value));
            authService.setToken(session.token, session.user_id);
          });
        } else {
          this.auth = false;
          vm.isLoading = false;
          console.log('not authenticated');
        }

      });
    } else {
      console.log('Chrome Cookies API not accessible');
    }

  }

  ngOnInit() {
    let vm = this;

    if (!vm.auth) {
      this.intercomService.bootIntercom();
      this.intercomService.trackEvent('chrome-ext-click');
    }

    this.userService.user.subscribe((u) => {
      this.user = u;
      console.log('user: ', this.user);
      if (this.user) {
        this.intercomService.bootIntercom(this.user);
        this.intercomService.trackEvent('chrome-ext-click');

        this.pendoService.initPendo({
          visitor: {
            id: this.user.id,
            email: this.user.email,
            name: this.user.name,
            customer_slug: this.user.customer.slug,
            job_role: this.user.preferences.job_position,
            interests: this.user.preferences.preferred_services,
            subscription_plan: this.user.plan_name,
            created_date: new Date(this.user.created_at * 1000),
            trial_expires_at: this.user.trial_expires_at ? this.user.trial_expires_at : null,
            days_left_on_trial: this.user.trial_expires_at ? Math.ceil((new Date(this.user.trial_expires_at).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) : null
          },

          account: {
            id: this.user.customer.id,
            slug: this.user.customer.slug
          }
        });
      }

    });

    this.companyService.company.subscribe((c: Company) => {
      console.log('c', c);
      if (c !== null) {
        this.site = new Site({
          report: {
            status_code: 2
          }
        });
        this.company = c;
        this.services = c.services.sort(function(a : any, b : any) : number {
          if (vm.user.service_order[a.shortname] > vm.user.service_order[b.shortname]) {
            return 1;
          } else {
            return -1;
          }
        });
        this.traffic = c.traffic;
        vm.isLoading = false;
      }

    });

    this.companyService.site.subscribe((s: Site) => {
      console.log('s', s);
      if (s !== null) {
        this.site = s;
        this.company = s.company;
        this.services = s.services.sort(function(a : any, b : any) : number {
          if (vm.user.service_order[a.shortname] > vm.user.service_order[b.shortname]) {
            return 1;
          } else {
            return -1;
          }
        });
        this.traffic = s.traffic;
        vm.isLoading = false;
      }

    });

    this.chromeRef.tabs.getSelected(null, function(tab) {
      let temp = tab.url.split('//')[1];
      let url = temp.split('/')[0];
      vm.zoneRef.run(() => {
        vm.mixpanelService.track('chrome_ext_click', { hostname: url });
        vm.userService.setUser().then((res) => {
          if (res) {
            vm.companyService.setCompany(url);
          }
        });
      });
    });
  }

  goToLinkedInAuth() : void {
    this.intercomService.shutdownIntercom();
    this.windowRef.open(environment.linkedinRedirect, '_blank');
  }
}
