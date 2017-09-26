import { Injectable } from '@angular/core';

import { WindowService } from '../window/window.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class PubnubService {

  windowRef : any;
  pubnub : any;

  constructor(private windowService: WindowService) {
    this.windowRef = windowService.nativeWindow;

    this.pubnub = new this.windowRef.PubNub({
      subscribeKey: environment.pubnub.subscribeKey
    });
  }

  addListener(obj : Object) : void {
    this.pubnub.addListener(obj);
  }

  subscribe(channel : string) : void {
    this.pubnub.subscribe({
      channels: [channel]
    });
  }

}
