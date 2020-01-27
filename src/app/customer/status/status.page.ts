import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { CustomerService } from '../customer.service';
import { AuthService } from '../../auth/auth.service';
import { Customer } from '../customer.model';
import { EmotionChangedComponent } from './emotion-changed/emotion-changed.component';
import { PushupComponent } from '../pushup/pushup.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit, OnDestroy {
  loadedCustomer: Customer;
  isLoading;
  private customerSub: Subscription;
  timer: number;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.timerReset();
    const email = this.authService.userEmail;
    this.customerSub = this.customerService.fetchingCustomer(email).subscribe(customer => {
      this.loadedCustomer = customer;
      this.openPushup(this.loadedCustomer);
      this.isLoading = false;
    });
    this.menuCtrl.enable(false, 'retailer');
    this.menuCtrl.enable(true, 'customer');
    this.menuCtrl.enable(false, 'admin');
  }

  ionViewWillEnter() {
    this.loadedCustomer = this.customerService.customer;
  }

  timerReset() {
    this.timer = 300;
  }

  emotionChanged(newEmotion) {
    this.timerReset();
    this.loadedCustomer.lastEmotion = this.loadedCustomer.emotion;
    this.loadedCustomer.emotion = newEmotion;
    if (!this.loadedCustomer.currentShop) {
      this.alertCtrl.create({message: 'Please select a shop first, if you want to save the emotion in your history!'}).then(alertEl =>
        alertEl.present());
      setTimeout(alertEl => {
        this.alertCtrl.dismiss();
        }, 3000);
      this.customerService.updateCustomer(this.loadedCustomer).subscribe();
      return null;
    }
    if (!this.loadedCustomer.emotionHistory) {
      this.loadedCustomer.emotionHistory = [{
        emotion: this.loadedCustomer.emotion,
        time: new Date(),
        shop: this.loadedCustomer.currentShop
      }];
    } else {
    this.loadedCustomer.emotionHistory.push({
      emotion: this.loadedCustomer.emotion,
      time: new Date(),
      shop: this.loadedCustomer.currentShop});
    }
    this.customerService.updateCustomer(this.loadedCustomer).subscribe();
    // this.showAlert(this.loadedCustomer.emotion);
    this.openModalEmotionChanged(this.loadedCustomer.emotion);
  }

  private openPushup(customer: Customer) {
    if (this.timer === 0 && this.authService.userEmail) {
      this.modalCtrl
      .create({
        component: PushupComponent,
        cssClass: 'modal-customer-css',
        componentProps: {customer}
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'yes') {
          return;
        } else if (resultData.role === 'no') {
          this.timerReset();
          this.openPushup(customer);
        }
      });
    }
    this.timer = this.timer - 1;
    if (this.timer >= 0 && this.authService.userEmail) {
      setTimeout(() => {
        this.openPushup(customer);
        }, 1000);
    }
  }

  private openModalEmotionChanged(emotion: string) {
    this.modalCtrl
    .create({
      component: EmotionChangedComponent,
      cssClass: 'modal-customer-css',
      componentProps: {emotion}
    })
    .then(modalEl => {
      modalEl.present();
    });
  }

  private showAlert(emotion: string) {
    let iconName: string;
    switch (emotion) {
      case 'Happy': {
        iconName = 'happy';
        break;
      }
      case 'Sad': {
        iconName = 'sad';
        break;
      }
      default:    {
        iconName = 'home';
        break;
      }
    }
    this.alertCtrl.create({message:
      // `<ion-icon name="${iconName}"></ion-icon>`
      `Your emotion changed to ${emotion}!`
    }).then(alertEl =>
      alertEl.present());
    setTimeout(alertEl => {
      this.alertCtrl.dismiss();
      }, 2000);
  }

  ngOnDestroy() {
    if (this.customerSub) {
      this.customerSub.unsubscribe();
    }
  }

}
