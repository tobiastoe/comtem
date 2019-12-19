import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { CustomerService } from '../customer.service';
import { AuthService } from '../../auth/auth.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit, OnDestroy {
  loadedCustomer: Customer;
  isLoading;
  private customerSub: Subscription;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    const email = this.authService.userEmail;
    this.isLoading = true;
    this.customerSub = this.customerService.fetchingCustomer(email).subscribe(customer => {
      this.loadedCustomer = customer;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.loadedCustomer = this.customerService.customer;
  }

  emotionChanged(newEmotion) {
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
    this.showAlert(this.loadedCustomer.emotion);
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
