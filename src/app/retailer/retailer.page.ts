import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RetailerService } from './retailer.service';
import { Retailer } from './retailer.model';
import { Customer } from '../customer/customer.model';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.page.html',
  styleUrls: ['./retailer.page.scss'],
})
export class RetailerPage implements OnInit, OnDestroy {
  loadedRetailer: Retailer;
  isLoading = false;
  private retailerSub: Subscription;
  customersinShop: Customer[];

  constructor(
    private authService: AuthService,
    private retailerService: RetailerService
  ) { }

  ngOnInit() {
    const email = this.authService.userEmail;
    this.isLoading = true;
    this.retailerSub = this.retailerService.fetchingRetailer(email).subscribe(retailer => {
      this.loadedRetailer = retailer;
      this.retailerService.fetchingCustomersInShop(this.loadedRetailer.name).subscribe(customers => {
        this.customersinShop = customers;
        this.isLoading = false;
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.retailerSub) {
      this.retailerSub.unsubscribe();
    }
  }

}
