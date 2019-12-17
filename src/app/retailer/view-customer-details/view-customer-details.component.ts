import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { ModalController } from '@ionic/angular';
import { Retailer } from '../retailer.model';

@Component({
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.scss'],
})
export class ViewCustomerDetailsComponent implements OnInit {
  @Input() customer: Customer;
  @Input() retailer: Retailer;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
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
