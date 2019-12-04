import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  loadedCustomer: Customer;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.loadedCustomer = this.customerService.customer;
  }

  ishappy() {
    this.loadedCustomer.emotion = 'happy';
    console.log(this.loadedCustomer.emotion);
  }

  isrelaxed() {
    this.loadedCustomer.emotion = 'relaxed';
    console.log(this.loadedCustomer.emotion);
  }

  issad() {
    this.loadedCustomer.emotion = 'sad';
    console.log(this.loadedCustomer.emotion);
  }

  isstressed() {
    this.loadedCustomer.emotion = 'stressed';
    console.log(this.loadedCustomer.emotion);
  }

}
