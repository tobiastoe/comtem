import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {ChartsModule} from 'ng2-charts';
import 'chartjs-plugin-zoom';

import { StarRatingModule } from 'ionic4-star-rating';

import { RetailerPageRoutingModule } from './retailer-routing.module';

import { RetailerPage } from './retailer.page';
import { ViewCustomerDetailsComponent } from './view-customer-details/view-customer-details.component';
import { AdviceRatingComponent } from './advice-rating/advice-rating.component';
import { AlertEmotionChangeComponent } from './alert-emotion-change/alert-emotion-change.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetailerPageRoutingModule,
    ChartsModule,
    StarRatingModule,
  ],
  declarations: [RetailerPage, ViewCustomerDetailsComponent, AdviceRatingComponent, AlertEmotionChangeComponent],
  entryComponents: [ViewCustomerDetailsComponent, AdviceRatingComponent, AlertEmotionChangeComponent]
})
export class RetailerPageModule {}
