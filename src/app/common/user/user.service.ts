import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { User } from './user';

import { AuthService } from '../auth/auth.service';
import { PubnubService } from '../pubnub/pubnub.service';

@Injectable()
export class UserService {

  token : string;
  userId : string;
  headers : Headers;
  options : RequestOptions;
  user : Subject<User> = new BehaviorSubject<User>(null);

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

  getUser () : Observable<Response> {
    console.log('requesting user object', this.userId);
    return this.http.request('https://api-test.intricately.com/api/v1/users/' + this.userId,
    this.options);
  }

  setUser () : any {
    return new Promise((resolve) => {
      this.getUser().map((res: Response) => {
        return res.json();
      }).subscribe((res: any) => {
        let u = new User(res.user);
        this.user.next(u);
        resolve(true);
      });
    });


  }

}
