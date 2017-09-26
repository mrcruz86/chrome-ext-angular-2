import { Injectable } from '@angular/core';

import { WindowService } from '../window/window.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class PendoService {

  windowRef : any;
  pendo : any;

  constructor(private windowService: WindowService) {
    this.windowRef = windowService.nativeWindow;

    this.pendo = this.windowRef.pendo;
  }

  initPendo(config : any) : void {
    config.apiKey = environment.pendo.key;
    this.pendo.initialize(config)
  }

}
