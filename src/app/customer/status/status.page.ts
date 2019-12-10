import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { AuthService } from '../../auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  loadedCustomer: Customer;
  isLoading;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    const email = this.authService.userEmail;
    this.isLoading = true;
    this.customerService.fetchingCustomer(email).subscribe(customer => {
      this.loadedCustomer = customer;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
  }

  emotionChanged(newEmotion) {
    this.loadedCustomer.lastEmotion = this.loadedCustomer.emotion;
    this.loadedCustomer.emotion = newEmotion;
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
    this.customerService.updateCustomerEmotion(this.loadedCustomer).subscribe();
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
    this.alertCtrl.create({message: `<ion-icon name="${iconName}"></ion-icon>`}).then(alertEl =>
      alertEl.present());
    setTimeout(alertEl => {
      this.alertCtrl.dismiss();
      }, 1000);
  }

}
