import { Component } from '@angular/core';

import { User } from '../common/user/user';
import { Company } from '../common/company/company';
import { Site } from '../common/company/site';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  inputs: ['company', 'services', 'traffic', 'report', 'user']
})
export class CompaniesComponent {

  company : Company;
  services : Array<Object>;
  traffic : Object;
  report: Object;
  user: User;


  constructor() { }


}
