import { Component, OnInit } from '@angular/core';

import { User } from '../../common/user/user';
import { Company } from '../../common/company/company';

@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.scss'],
  inputs: ['services', 'company', 'report', 'user']
})
export class CompanyServicesComponent implements OnInit {

  services: Array<Object>;
  report: Object;
  company: Company;
  user: User;

  constructor() { }

  ngOnInit() { }

}
