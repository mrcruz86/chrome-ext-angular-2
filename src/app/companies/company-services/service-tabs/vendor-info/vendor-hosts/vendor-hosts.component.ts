import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-hosts',
  templateUrl: './vendor-hosts.component.html',
  styleUrls: ['./vendor-hosts.component.scss'],
  inputs: ['hosts']
})
export class VendorHostsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
