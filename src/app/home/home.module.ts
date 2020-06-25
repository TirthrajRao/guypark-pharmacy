import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { ServicesListComponent } from '../Forms/services-list/services-list.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { HeaderComponent } from '../header/header.component';
import { TransferPrscriptionComponent } from '../Forms/transfer-prscription/transfer-prscription.component';
import { RefillReqComponent } from '../Forms/refill-req/refill-req.component';
import { EmploymentComponent } from '../Forms/employment/employment.component';
import { PriceCheckComponent } from '../Forms/price-check/price-check.component';
import { OurServicesComponent } from '../Our-services/our-services/our-services.component';
import { FooterComponent } from '../footer/footer.component';
import { FreeHomeDeliveryComponent } from '../Our-services/free-home-delivery/free-home-delivery.component';
import { EScribeComponent } from '../Our-services/e-scribe/e-scribe.component';
import { CurbsideComponent } from '../Our-services/curbside/curbside.component';
import { SpecialityPackingComponent } from '../Our-services/speciality-packing/speciality-packing.component';
import { GenericDrugComponent } from '../Our-services/generic-drug/generic-drug.component';
import { MajorInsuranceComponent } from '../Our-services/major-insurance/major-insurance.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { NotificationComponent } from '../Notification/notification/notification.component';
import { HippaNoticeComponent } from '../hippa-notice/hippa-notice.component';
import { NotificationDetailComponent } from '../Notification/notification-detail/notification-detail.component';
import { ProfileComponent } from '../profile/profile.component';



// AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, "../../assets/i18n/", ".json");
// }
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomePage,
    HomePageComponent,
    ServicesListComponent,
    HeaderComponent,
    TransferPrscriptionComponent,
    RefillReqComponent,
    EmploymentComponent,
    PriceCheckComponent,
    OurServicesComponent,
    FooterComponent,
    FreeHomeDeliveryComponent,
    EScribeComponent,
    CurbsideComponent,
    SpecialityPackingComponent,
    GenericDrugComponent,
    MajorInsuranceComponent,
    ContactUsComponent,
    AboutUsComponent,
    NotificationComponent,
    NotificationDetailComponent,
    HippaNoticeComponent,
    ProfileComponent
  ]
})
export class HomePageModule { }
