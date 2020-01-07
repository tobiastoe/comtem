import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RetailerService } from './retailer.service';
import { Retailer } from './retailer.model';
import { Customer } from '../customer/customer.model';
import { ModalController, AlertController, MenuController } from '@ionic/angular';
import { ViewCustomerDetailsComponent } from './view-customer-details/view-customer-details.component';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.page.html',
  styleUrls: ['./retailer.page.scss'],
})
export class RetailerPage implements OnInit, OnDestroy {
  loadedRetailer: Retailer;
  isLoading = false;
  private retailerSub: Subscription;
  customersinShop: Customer[];
  customersinShopPast: Customer[];
  isRefreshing = true;

  constructor(
    private authService: AuthService,
    private retailerService: RetailerService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getData();
    this.menuCtrl.enable(true, 'retailer');
    this.menuCtrl.enable(false, 'customer');
    this.menuCtrl.enable(false, 'admin');
  }

  getData() {
    const email = this.authService.userEmail;
    this.customersinShopPast = this.customersinShop;
    this.retailerSub = this.retailerService.fetchingRetailer(email).subscribe(retailer => {
      this.loadedRetailer = retailer;
      this.retailerService.fetchingCustomersInShop(this.loadedRetailer.name).subscribe(customers => {
        this.customersinShop = customers;
        this.isLoading = false;
        this.compareCustomerData(this.customersinShopPast, this.customersinShop);
        }
      );
    });
    if (this.isRefreshing) {
      setTimeout(() => {
        this.getData();
      }, 3000);
    }
  }

  compareCustomerData(pastCustomerData: Customer[], currentCustomerData: Customer[]) {
    let match = false;
    for (const currentCustomer of currentCustomerData) {
      let j = pastCustomerData.length;
      const newEmotion = currentCustomer.emotion;
      for (const pastCustomer of pastCustomerData) {
        if (currentCustomer.email === pastCustomer.email) {
          match = true;
          const oldEmotion = pastCustomer.emotion;
          if (newEmotion !== oldEmotion) {
            this.retailerService.getAdvice(oldEmotion.toLowerCase(), newEmotion.toLowerCase()).subscribe(resData => {
            this.showAlertEmotionChange(resData[Math.floor(Math.random() * resData.length)], currentCustomer, oldEmotion, newEmotion);
            });
          }
        }
        j -= 1;
        if (j === 0 && !match) {
          this.showAlertEnteredLeft('Keep calm!', currentCustomer, 'entered');
        }
      }
      match = false;
    }
    for (const pastCustomer of pastCustomerData) {
      let i = currentCustomerData.length;
      for (const currentCustomer of currentCustomerData) {
        if (pastCustomer.email === currentCustomer.email) {
          match = true;
        }
        i -= 1;
        if (i === 0 && !match) {
          this.showAlertEnteredLeft('Keep calm!', pastCustomer, 'left');
        }
      }
      match = false;
    }
  }

  ngOnDestroy() {
    if (this.retailerSub) {
      this.retailerSub.unsubscribe();
    }
  }

  viewCustomer(customer: Customer, retailer: Retailer) {
    this.modalCtrl
    .create({
      component: ViewCustomerDetailsComponent,
      componentProps: {customer, retailer}
    })
    .then(modalEl => {
      modalEl.present();
    });
  }

  private showAlertEmotionChange(message: string, customer: Customer, oldEmotion: string, newEmotion: string) {
    this.alertCtrl.create(
      {header: `${customer.name} emotion changed from ${oldEmotion} to ${newEmotion}`,
      message,
      buttons: ['Okay']}).then(alertEl => alertEl.present());
  }

  private showAlertEnteredLeft(message: string,  customer: Customer, verb: string) {
    this.alertCtrl.create(
      {header: `${customer.name} has ${verb} your shop!`,
      message,
      buttons: ['Okay']}).then(alertEl => alertEl.present());
  }

  switchRefreshingMode() {
    this.isRefreshing = !this.isRefreshing;
    if (this.isRefreshing) {
      this.getData();
    }
  }
}
