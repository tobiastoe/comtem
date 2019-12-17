import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetailerPageRoutingModule } from './retailer-routing.module';

import { RetailerPage } from './retailer.page';
import { ViewCustomerDetailsComponent } from './view-customer-details/view-customer-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetailerPageRoutingModule
  ],
  declarations: [RetailerPage, ViewCustomerDetailsComponent],
  entryComponents: [ViewCustomerDetailsComponent]
})
export class RetailerPageModule {}
