import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  loadedCustomer: Customer;

  constructor(private customerSerice: CustomerService) { }

  ngOnInit() {
    this.loadedCustomer = this.customerSerice.customer;
  }
}
