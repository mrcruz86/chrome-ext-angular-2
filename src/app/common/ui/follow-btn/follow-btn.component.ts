import { Component, OnChanges } from '@angular/core';
import { Response } from '@angular/http';

import { CompanyService } from '../../company/company.service';

@Component({
  selector: 'app-follow-btn',
  templateUrl: './follow-btn.component.html',
  styleUrls: ['./follow-btn.component.scss'],
  providers: [CompanyService],
  inputs: ['companyId']
})
export class FollowBtnComponent implements OnChanges {

  isWatching : boolean;
  companyId : string;

  constructor(private companyService : CompanyService) {

  }

  toggleWatch () : void {
    let vm = this;
    if (this.isWatching === true) {
      this.companyService.unwatchCompany(this.companyId).subscribe((res: Response) => {
        vm.isWatching = false;
      });
      this.isWatching = !this.isWatching;
    } else {
      this.companyService.watchCompany(this.companyId).subscribe((res: Response) => {
        vm.isWatching = true;
      });
      this.isWatching = !this.isWatching;
    }
  }

  ngOnChanges(...args : any[]) : void {
    let id = args[0].companyId.currentValue;
    let vm = this;

    if (id) {
      this.companyService.getWatchedCompany(id).subscribe((res: Response) => {
        vm.isWatching = true;
      }, (err: any) => {
        if (err.status === 404) {
          vm.isWatching = false;
        }
      });
    }
  }

}
