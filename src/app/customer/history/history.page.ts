import { Component, OnInit } from '@angular/core';
import { CustomerService, CustomerResData } from '../customer.service';
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
  isDeleting;

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

  deleteHistory(customer: Customer) {
    this.isDeleting = true;
    this.customerService.deleteEmotionHistory(customer).subscribe(() => {
      this.loadedCustomer.emotionHistory = null;
      this.isDeleting = false;
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
