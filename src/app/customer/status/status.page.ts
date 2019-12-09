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
    this.customerService.sendData().subscribe();
  }

  emotionChanged(newEmotion) {
    this.loadedCustomer.lastEmotion = this.loadedCustomer.emotion;
    this.loadedCustomer.emotion = newEmotion;
    this.loadedCustomer.emotionHistory.push({
      emotion: this.loadedCustomer.emotion,
      time: new Date(),
      shop: this.loadedCustomer.currentShop});
    console.log(this.loadedCustomer);
  }

}
