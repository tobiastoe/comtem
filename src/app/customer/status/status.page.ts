import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  loadedCustomer: Customer;
  constructor(private customerService: CustomerService, private authService: AuthService) { }

  ngOnInit() {
    this.loadedCustomer = this.customerService.customer;
    console.log(this.loadedCustomer);
  }

  ionViewWillEnter() {
    this.customerService.fetchingCustomer().subscribe();
  }

  emotionChanged(newEmotion) {
    this.loadedCustomer.lastEmotion = this.loadedCustomer.emotion;
    this.loadedCustomer.emotion = newEmotion;
    this.loadedCustomer.emotionHistory.push({
      emotion: this.loadedCustomer.emotion,
      time: new Date(),
      shop: this.loadedCustomer.currentShop});
  }

}
