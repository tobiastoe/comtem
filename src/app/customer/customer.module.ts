import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerPageRoutingModule } from './customer-routing.module';

import { CustomerPage } from './customer.page';
import { EmotionChangedComponent } from './status/emotion-changed/emotion-changed.component';
import { PushupComponent } from './pushup/pushup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPageRoutingModule
  ],
  declarations: [CustomerPage, EmotionChangedComponent, PushupComponent],
  entryComponents: [EmotionChangedComponent, PushupComponent]
})
export class CustomerPageModule {}
