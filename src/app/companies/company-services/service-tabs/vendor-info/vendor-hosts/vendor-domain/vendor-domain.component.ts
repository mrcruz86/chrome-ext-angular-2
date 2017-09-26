import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-vendor-domain',
  templateUrl: './vendor-domain.component.html',
  styleUrls: ['./vendor-domain.component.scss'],
  animations: [
    trigger('toggleSubdomains', [
      state('open', style({ height: '*' })),
      state('close', style({ height: '0px' })),
      transition('close => open', [
        animate('300ms ease-in-out')
      ]),
      transition('open => close', animate('300ms ease-in-out'))
    ]),
    trigger('toggleSubdomainsArrow', [
      state('open', style({ transform: 'rotate(90deg)' })),
      state('close', style({ transform: 'rotate(0deg)' })),
      transition('close => open', [
        animate('300ms ease-in-out')
      ]),
      transition('open => close', animate('300ms ease-in-out'))
    ])
  ],
  inputs: ['domain', 'first']
})
export class VendorDomainComponent implements OnInit {

  first: boolean;
  subdomain: any = {
    state: 'close'
  };

  constructor() { }

  ngOnInit() {
    if (this.first) {
      this.subdomain.state = 'open';
    }
  }

  toggleSubdomains() : void {
    if (this.subdomain.state === 'close') {
      this.subdomain.state = 'open';
    } else {
      this.subdomain.state = 'close';
    }
  }

}
