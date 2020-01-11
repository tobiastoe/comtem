import { Component, OnInit, Input } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { RetailerService } from '../retailer/retailer.service';
import { NewAdviceComponent } from './new-advice/new-advice.component';
import { AdvicesService } from './advices.service';
import { Advice } from '../retailer/advice.model';
import { ShowAdvicesComponent } from './show-advices/show-advices.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  isLoading = false;
  allAdvices: Advice[];

  constructor(
    private menuCtrl: MenuController,
    private retailerService: RetailerService,
    private modalCtrl: ModalController,
    private advicesService: AdvicesService
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.menuCtrl.enable(false, 'retailer');
    this.menuCtrl.enable(false, 'customer');
    this.menuCtrl.enable(true, 'admin');

    this.fetchAdvices();
  }

  fetchAdvices() {
    this.isLoading = true;
    this.advicesService.fetchAdvices().subscribe((resData) => {
      this.allAdvices = resData;
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
        this.fetchAdvices();
      }
    })
    ;
  }

  showAdvices(oldEmotion: string, newEmotion: string) {
    const advices = this.allAdvices;
    this.modalCtrl
    .create({
      component: ShowAdvicesComponent,
      componentProps: {oldEmotion, newEmotion, advices}
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      if (resultData.role === 'confirm') {
        this.fetchAdvices();
      }
    });
  }

}
