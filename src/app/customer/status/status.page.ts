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

  emotionChanged(newEmotion) {
    this.loadedCustomer.emotion = newEmotion;
    this.loadedCustomer.emotionHistory.push({
      emotion: this.loadedCustomer.emotion,
      time: 'Saturday',
      shop: 'Kabinett24'});
    console.log(this.loadedCustomer.emotion);
    console.log(this.loadedCustomer.emotionHistory);
  }

  // ishappy() {
  //   this.loadedCustomer.emotion = 'happy';
  //   this.loadedCustomer.emotionHistory.push(this.loadedCustomer.emotion);
  //   console.log(this.loadedCustomer.emotion);
  //   console.log(this.loadedCustomer.emotionHistory);
  // }

  // isrelaxed() {
  //   this.loadedCustomer.emotion = 'relaxed';
  //   console.log(this.loadedCustomer.emotion);
  // }

  // issad() {
  //   this.loadedCustomer.emotion = 'sad';
  //   console.log(this.loadedCustomer.emotion);
  // }

  // isstressed() {
  //   this.loadedCustomer.emotion = 'stressed';
  //   console.log(this.loadedCustomer.emotion);
  // }

}
