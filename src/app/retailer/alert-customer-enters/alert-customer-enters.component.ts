import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-customer-enters',
  templateUrl: './alert-customer-enters.component.html',
  styleUrls: ['./alert-customer-enters.component.scss'],
})
export class AlertCustomerEntersComponent implements OnInit {
  @Input() customer: Customer;
  @Input() message: string;
  @Input() customerEmotion: string;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
