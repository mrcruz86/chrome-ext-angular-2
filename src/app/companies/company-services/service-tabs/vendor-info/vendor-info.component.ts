import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Response } from '@angular/http';

import { CompanyService } from '../../../../common/company/company.service';

import { Company } from '../../../../common/company/company';

@Component({
  selector: 'app-vendor-info',
  templateUrl: './vendor-info.component.html',
  styleUrls: ['./vendor-info.component.scss'],
  providers: [CompanyService],
  inputs: ['service', 'company', 'vendor']
})
export class VendorInfoComponent implements OnInit {

  vendorInfo: any;
  service: any;
  company: Company;
  vendor: any;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getCompanyVendorInfo(this.company.id, 1, 1).subscribe((res: Response) => {
      this.vendorInfo = res.json();
    });
  }

}
