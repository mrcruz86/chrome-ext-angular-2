import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { environment } from '../../../environments/environment';

import { Company } from '../../common/company/company';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
  inputs: ['company', 'traffic']
})
export class CompanyInfoComponent implements OnInit {

  company : Company;
  traffic : Object;
  url : string = environment.url;

  constructor() { }

  ngOnInit() { }

}
