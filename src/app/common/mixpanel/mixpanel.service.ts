import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import * as Mixpanel from 'mixpanel-browser';

@Injectable()
export class MixpanelService {

  mixpanel : any;
  people: Object = {
    track_charge: this.track_charge,
    set: this.set
  };

  constructor() {
    Mixpanel.init(environment.mixpanel.key);
    this.mixpanel = Mixpanel;
  }

  track(...args) : void {
    this.mixpanel.track(args[0], args[1]);
  }

  track_charge(...args) : void {
    this.mixpanel.people.track_charge(args[0]);
  }

  set(...args) : void {
    this.mixpanel.people.set(args[0]);
  }

  register_once(...args) : void {
    this.mixpanel.register_once(args[0]);
  }

  register(...args) : void {
    this.mixpanel.register(args[0]);
  }

}
