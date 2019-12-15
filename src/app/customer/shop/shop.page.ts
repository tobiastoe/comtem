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
      });
    });
  }
}
