import { Component, OnChanges, trigger, state, style, transition, animate } from '@angular/core';

import { environment } from '../../../../environments/environment';

import { User } from '../../../common/user/user';
import { Company } from '../../../common/company/company';

@Component({
  selector: 'app-service-tabs',
  templateUrl: './service-tabs.component.html',
  styleUrls: ['./service-tabs.component.scss'],
  animations: [
    trigger('toggleVendorInfo', [
      state('open', style({ height: '*' })),
      state('close', style({ height: '0px' })),
      transition('close => open', [
        animate('500ms ease-in-out')
      ]),
      transition('open => close', animate('500ms ease-in-out'))
    ])
  ],
  inputs: ['service', 'company', 'user']
})
export class ServiceTabsComponent implements OnChanges {

  url : string = environment.url;
  service : any;
  isOpen : boolean;
  tabState : any;
  chromeRef : any;
  user: User;
  company: Company;
  vendor : any;
  vendorInfo: any = {
    state: 'close'
  };

  constructor() {
    let vm = this;
    vm.chromeRef = chrome;
    vm.chromeRef.storage.onChanged.addListener(function(changes: any) {
      vm.tabState = changes.tabState.newValue;
    });
  }

  ngOnChanges(...args : any[]) : void {
    if (args[0].service) {
      let vm = this;
      vm.chromeRef.storage.sync.get('tabState', function(items : any) {
        vm.tabState = items.tabState;
        let serviceName = args[0].service.currentValue.shortname;
        vm.isOpen = vm.tabState[serviceName].tab_open;
      });
    }
  }

  vendorClick(v : any) : void {
    let vm = this;
    if (vm.vendor && vm.vendor === v) {
      this.vendorInfo.state = 'close';
      vm.vendor = null;
    } else {
      vm.vendor = v;
      this.vendorInfo.state = 'open';
    }

  }

  toggleTab(e : any) : void {
    let vm = this;
    vm.tabState[vm.service.shortname].tab_open = !vm.tabState[vm.service.shortname].tab_open;
    if (!vm.tabState[vm.service.shortname].tab_open) {
      this.vendorInfo.state = 'close';
    }
    vm.isOpen = vm.tabState[vm.service.shortname].tab_open;
    vm.chromeRef.storage.sync.set({ 'tabState': vm.tabState });
  }

}
