import { Injectable } from '@angular/core';

import { User } from '../user/user';

import { WindowService } from '../window/window.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class IntercomService {

  windowRef : any;
  intercom : any;
  intercomUser : any;

  constructor(private windowService: WindowService) {
    this.windowRef = windowService.nativeWindow;
  }

  bootIntercom(user?: User) : void {

    if (user) {
      this.intercomUser = {
        app_id: environment.intercom.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
        user_id: user.id,
        user_type: user.user_type,
        headline: user.linkedin_headline,
        linkedin_url: user.linkedin_url,
        trial_expires_at: user.trial_expires_at
      };

      if (user.customer.id) {
        this.intercomUser.companies = [{
          company_id: user.customer.id,
          name: user.customer.name
        }];
      }

      this.windowRef.Intercom('boot', this.intercomUser);
    } else {
      this.windowRef.Intercom('boot', { app_id: environment.intercom.id });
    }

  }

  shutdownIntercom() : void {
    this.windowRef.Intercom('shutdown');
  }

  trackEvent(...args: any[]) : void {
    this.windowRef.Intercom('trackEvent', args[0], args[1]);
  }

}
