import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as moment from 'moment/moment';
moment.updateLocale('en', {
  relativeTime : {
    future: "%s",
    past:   "%s ago",
    s:  "today",
    m:  "today",
    mm: "today",
    h:  "today",
    hh: "today",
    d:  "tomorrow",
    dd: "in %d days",
    M:  "in a month",
    MM: "in %d months",
    y:  "in a year",
    yy: "in %d years"
  }
});

import { MomentModule } from 'angular2-moment';

import { WindowService } from './common/window/window.service';
import { AuthService } from './common/auth/auth.service';
import { UserService } from './common/user/user.service';
import { PubnubService } from './common/pubnub/pubnub.service';
import { MixpanelService } from './common/mixpanel/mixpanel.service';
import { PendoService } from './common/pendo/pendo.service';
import { IntercomService } from './common/intercom/intercom.service';
import { CompanyService } from './common/company/company.service';

import { AppComponent } from './app.component';
import { CompaniesComponent } from './companies/companies.component';
import { SpendPipe } from './common/pipes/spend/spend.pipe';
import { HeaderComponent } from './common/ui/header/header.component';
import { CompanyInfoComponent } from './companies/company-info/company-info.component';
import { ObjectToArrayPipe } from './common/pipes/object-to-array/object-to-array.pipe';
import { CompanyServicesComponent } from './companies/company-services/company-services.component';
import { ServiceTabsComponent } from './companies/company-services/service-tabs/service-tabs.component';
import { TierPipe } from './common/pipes/tier/tier.pipe';
import { LimitArrayPipe } from './common/pipes/limit-array/limit-array.pipe';
import { PercentBarComponent } from './common/ui/percent-bar/percent-bar.component';
import { FollowBtnComponent } from './common/ui/follow-btn/follow-btn.component';
import { VendorInfoComponent } from './companies/company-services/service-tabs/vendor-info/vendor-info.component';
import { AppLabelsComponent } from './common/ui/app-labels/app-labels.component';
import { VendorHostsComponent } from './companies/company-services/service-tabs/vendor-info/vendor-hosts/vendor-hosts.component';
import { VendorDomainComponent } from './companies/company-services/service-tabs/vendor-info/vendor-hosts/vendor-domain/vendor-domain.component';
import { FaqBtnComponent } from './common/ui/faq-btn/faq-btn.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule
  ],
  providers: [
    WindowService,
    AuthService,
    UserService,
    CompanyService,
    PubnubService,
    MixpanelService,
    PendoService,
    IntercomService
  ],
  declarations: [
    AppComponent,
    CompaniesComponent,
    SpendPipe,
    HeaderComponent,
    CompanyInfoComponent,
    ObjectToArrayPipe,
    CompanyServicesComponent,
    ServiceTabsComponent,
    TierPipe,
    LimitArrayPipe,
    PercentBarComponent,
    FollowBtnComponent,
    VendorInfoComponent,
    AppLabelsComponent,
    VendorHostsComponent,
    VendorDomainComponent,
    FaqBtnComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
