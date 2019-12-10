import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { AuthService } from '../../auth/auth.service';

import { Customer } from '../customer.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  loadedCustomer: Customer;
  isLoading;

  constructor(private customerService: CustomerService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
  }

  ionViewWillEnter() {
    const email = this.authService.userEmail;
    this.isLoading = true;
    this.customerService.fetchingCustomer(email).subscribe(customer => {
      this.loadedCustomer = customer;
      this.isLoading = false;
    });
  }

  setColor(currentEmotion) {
    switch (currentEmotion) {
      case 'Happy': {
        return 'success';
      }
      case 'Relaxed': {
        return 'medium';
      }
      case 'Sad': {
        return 'warning';
      }
      case 'Stressed': {
        return 'danger';
      }
    }
  }
}
