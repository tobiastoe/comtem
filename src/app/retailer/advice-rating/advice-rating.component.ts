import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { Advice } from '../advice.model';
import { ModalController } from '@ionic/angular';
import { RetailerService } from '../retailer.service';

@Component({
  selector: 'app-advice-rating',
  templateUrl: './advice-rating.component.html',
  styleUrls: ['./advice-rating.component.scss'],
})
export class AdviceRatingComponent implements OnInit {
  @Input() customer: Customer;
  @Input() advice: Advice;

  constructor(
    private modalCtrl: ModalController,
    private retailerService: RetailerService
    ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  logRatingChange(rating: number) {
    if (this.advice.retailerRating) {
      this.advice.retailerRating.push(rating);
    } else {
      this.advice.retailerRating = [rating];
    }
    this.retailerService.updateAdvice(this.advice).subscribe(() => {
      this.modalCtrl.dismiss();
    });
    }

}
