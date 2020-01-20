import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { Advice } from '../advice.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-advice-rating',
  templateUrl: './advice-rating.component.html',
  styleUrls: ['./advice-rating.component.scss'],
})
export class AdviceRatingComponent implements OnInit {
  @Input() customer: Customer;
  @Input() advice: Advice;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }
}
