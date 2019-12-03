import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetailerPage } from './retailer.page';

const routes: Routes = [
  {
    path: '',
    component: RetailerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetailerPageRoutingModule {}
