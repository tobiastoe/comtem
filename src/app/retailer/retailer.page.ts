import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RetailerService } from './retailer.service';
import { Retailer } from './retailer.model';
import { Customer } from '../customer/customer.model';
import { ModalController, AlertController } from '@ionic/angular';
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
  isRefreshing = false;

  constructor(
    private authService: AuthService,
    private retailerService: RetailerService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getData();
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
    let index = 0;
    for (const currentCustomer of currentCustomerData) {
      const oldEmotion = pastCustomerData[index].emotion;
      const newEmotion = currentCustomer.emotion;
      if (newEmotion !== oldEmotion) {
       this.retailerService.getAdvice(oldEmotion.toLowerCase(), newEmotion.toLowerCase()).subscribe(resData => {
        this.showAlert(resData, currentCustomer, oldEmotion, newEmotion);
       });
      }
      index += 1;
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

  private showAlert(message: string, customer: Customer, oldEmotion: string, newEmotion: string) {
    this.alertCtrl.create(
      {header: `${customer.name} emotion changed from ${oldEmotion} to ${newEmotion}`,
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
