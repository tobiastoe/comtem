import { Component, OnInit, Input } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { RetailerService } from '../retailer/retailer.service';
import { NewAdviceComponent } from './new-advice/new-advice.component';
import { AdvicesService } from './advices.service';
import { Advice } from '../retailer/advice.model';

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

    this.advicesService.fetchAdvices().subscribe((resData) => {
      this.allAdvices = resData;
      console.log(this.allAdvices);
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

  showAdvices(oldEmotion: string, newEmotion: string) {

  }

  deleteAdvice(advice: Advice) {
    this.advicesService.deleteAdvice(advice).subscribe(() => {
    });
  }

}
