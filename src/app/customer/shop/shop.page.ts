import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Retailer } from 'src/app/retailer/retailer.model';

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

  constructor(private customerSerice: CustomerService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadedCustomer = this.customerSerice.customer;
    this.isLoading = true;
    this.customerSerice.fetchAllRetailers().subscribe(resData => {
      this.loadedRetailers = resData;
      this.isLoading = false;
    });
  }
}
