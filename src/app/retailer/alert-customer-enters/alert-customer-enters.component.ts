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

  twoEmotions: string;
  isOpen = true;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    switch (this.customer.emotion) {
      case 'Happy': {
        this.twoEmotions = 'excited / happy';
        break;
      }
      case 'Relaxed': {
        this.twoEmotions = 'satisfied / relaxed';
        break;
      }
      case 'Sad': {
        this.twoEmotions = 'sad / exhausted';
        break;
      }
      case 'Stressed': {
        this.twoEmotions = 'annoyed / concerned';
        break;
      }
  }
    setTimeout(() => {
      if (this.isOpen) {
        this.modalCtrl.dismiss(null, 'timeout');
      }
      }, 15000);
  }

  onCancel() {
    this.isOpen = false;
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
