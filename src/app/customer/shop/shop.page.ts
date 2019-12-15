import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Retailer } from 'src/app/retailer/retailer.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  loadedCustomer: Customer;
  isShopping = false;
  isLoading = false;
  loadedRetailers: Retailer[];
  currentRetailer: Retailer;

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
    this.customerService.fetchAllRetailers().subscribe(resData => {
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
    this.loadedCustomer.currentShop = newRetailer.name;
    this.loadCurrentRetailer(this.loadedCustomer, this.loadedRetailers);
    this.customerService.updateCustomer(this.loadedCustomer).subscribe();
  }
}
