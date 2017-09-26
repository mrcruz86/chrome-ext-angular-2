import { Component, OnInit } from '@angular/core';

import { WindowService } from '../../window/window.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  inputs: ['url', 'companyId', 'loading', 'user']
})
export class HeaderComponent implements OnInit {

  windowRef : any;

  constructor(private windowService: WindowService) {
    this.windowRef = windowService.nativeWindow;
  }

  ngOnInit() {
  }

  goToWebApp () : void {
    this.windowRef.open(environment.url + 'settings?extUp=true', '_blank');
  }

  daysLeftInTrial (date) : number {
    let trialDate : any = new Date(date);
    let today : any = new Date();
    console.log(Math.ceil((trialDate - today) / 1000 / 60 / 60 / 24));
    return Math.ceil((trialDate - today) / 1000 / 60 / 60 / 24);
  }

}
