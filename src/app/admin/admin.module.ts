import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { NewAdviceComponent } from './new-advice/new-advice.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule
  ],
  entryComponents: [NewAdviceComponent],
  declarations: [AdminPage, NewAdviceComponent]
})
export class AdminPageModule {}
