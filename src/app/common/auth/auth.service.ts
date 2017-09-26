import { Injectable } from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthService {

  authToken : Subject<string> = new BehaviorSubject<string>(null);
  userId : Subject<string> = new BehaviorSubject<string>(null);

  setToken (token : string, userId : string) : void {
    this.authToken.next(token);
    this.userId.next(userId);
  }

}
