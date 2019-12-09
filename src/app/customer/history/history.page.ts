import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  loadedCustomer: Customer;

  constructor(private customerSerice: CustomerService) { }

  ngOnInit() {
    this.loadedCustomer = this.customerSerice.customer;
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
