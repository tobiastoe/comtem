import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CustomerService } from '../customer.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Customer } from '../customer.model';
import { Retailer } from 'src/app/retailer/retailer.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit, OnDestroy {
  loadedCustomer: Customer;
  isShopping = false;
  isLoading = false;
  loadedRetailers: Retailer[];
  currentRetailer: Retailer;
  private customerSub: Subscription;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const email = this.authService.userEmail;
    this.loadedCustomer = this.customerService.customer;
    this.isLoading = true;
    this.customerSub = this.customerService.fetchAllRetailers().subscribe(resData => {
      this.loadedRetailers = resData;
      this.customerService.fetchingCustomer(email).subscribe(customer => {
        this.loadedCustomer = customer;
        this.isLoading = false;
        if (this.loadedCustomer.currentShop) {
          this.isShopping = true;
          this.loadCurrentRetailer(this.loadedCustomer, this.loadedRetailers);
        }
      });
    });
  }



  loadCurrentRetailer(customer: Customer, retailerList: Retailer[]) {
    for (const retailer of retailerList) {
      if (retailer.name === customer.currentShop) {
        this.currentRetailer = retailer;
      }
    }
  }

  shopChanged(newRetailer: Retailer) {
    this.isLoading = true;
    if (this.loadedCustomer.currentShop === newRetailer.name) {
      this.customerService.deleteCurrentShop(this.loadedCustomer).subscribe(() => {
        this.isLoading = false;
      });
      this.isShopping = false;
      this.currentRetailer = null;
      this.loadedCustomer.currentShop = null;
    } else {
      this.loadedCustomer.currentShop = newRetailer.name;
      this.loadCurrentRetailer(this.loadedCustomer, this.loadedRetailers);
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
      this.customerService.updateCustomer(this.loadedCustomer).subscribe(() => {
        this.isLoading = false;
      });
      this.isShopping = true;
    }
  }

  ngOnDestroy() {
    if (this.customerSub) {
      this.customerSub.unsubscribe();
    }
  }
}
