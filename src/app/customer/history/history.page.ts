import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, OnDestroy {
  loadedCustomer: Customer;
  isLoading;
  isDeleting;
  private customerSub: Subscription;
  twoEmotions: string;
  day: string;
  time: string;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private menuCtrl: MenuController,
    ) { }

  ngOnInit() {
    this.isLoading = true;
  }

  ionViewWillEnter() {
    const email = this.authService.userEmail;
    this.isLoading = true;
    this.customerSub = this.customerService.fetchingCustomer(email).subscribe(customer => {
      this.loadedCustomer = customer;
      this.isLoading = false;
    });
    this.menuCtrl.enable(false, 'retailer');
    this.menuCtrl.enable(true, 'customer');
    this.menuCtrl.enable(false, 'admin');
  }

  deleteHistory(customer: Customer) {
    this.isDeleting = true;
    this.customerService.deleteEmotionHistory(customer).subscribe(() => {
      this.loadedCustomer.emotionHistory = null;
      this.isDeleting = false;
    });
  }

  setColor(currentEmotion, date) {
    this.day = date.substring(0, 10);
    this.time = date.substring(11, 20);
    switch (currentEmotion) {
      case 'Happy': {
        this.twoEmotions = 'excited / happy';
        return 'success';
      }
      case 'Relaxed': {
        this.twoEmotions = 'pleased / relaxed';
        return 'secondary';
      }
      case 'Sad': {
        this.twoEmotions = 'sad / tired';
        return 'tertiary';
      }
      case 'Stressed': {
        this.twoEmotions = 'angry / frustrated';
        return 'danger';
      }
    }
  }

  ngOnDestroy() {
    if (this.customerSub) {
      this.customerSub.unsubscribe();
    }
  }
}
