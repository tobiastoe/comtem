import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { RetailerService } from '../retailer/retailer.service';
import { NewAdviceComponent } from './new-advice/new-advice.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  isLoading = false;

  constructor(
    private menuCtrl: MenuController,
    private retailerService: RetailerService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {

    this.menuCtrl.enable(false, 'retailer');
    this.menuCtrl.enable(false, 'customer');
    this.menuCtrl.enable(true, 'admin');

    this.retailerService.fetchAdvices().subscribe(() => {
      this.isLoading = false;
    });
  }

  addAdvice() {
    this.modalCtrl
    .create({
      component: NewAdviceComponent,
      componentProps: {}
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      if (resultData.role === 'confirm') {
        console.log('New Advice Created!');
      }
    })
    ;
  }

}
