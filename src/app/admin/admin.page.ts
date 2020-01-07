import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { RetailerService } from '../retailer/retailer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private retailerService: RetailerService,
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false, 'retailer');
    this.menuCtrl.enable(false, 'customer');
    this.menuCtrl.enable(true, 'admin');

    this.retailerService.fetchAdvices().subscribe();
  }

}
