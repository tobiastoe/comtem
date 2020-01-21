import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { ModalController } from '@ionic/angular';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-alert-emotion-change',
  templateUrl: './alert-emotion-change.component.html',
  styleUrls: ['./alert-emotion-change.component.scss'],
})
export class AlertEmotionChangeComponent implements OnInit {
  @Input() customer: Customer;
  @Input() oldEmotion: string;
  @Input() newEmotion: string;
  @Input() message: string;

  negativeChange = false;
  isLoading = false;
  endingS = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.isLoading = true;
    this.checkS();
    this.checkChange();
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  checkS() {
    if (Array.from(this.customer.name)[Array.from(this.customer.name).length - 1] === 's') {
      this.endingS = true;
    }
  }

  checkChange() {
    switch (this.oldEmotion) {
      case 'Happy': {
        switch (this.newEmotion) {
            case 'Relaxed': {
              this.negativeChange = true;
              this.isLoading = false;
              break;
            }
            case 'Sad': {
              this.negativeChange = true;
              this.isLoading = false;
              break;
            }
            case 'Stressed': {
              this.negativeChange = true;
              this.isLoading = false;
              break;
            }
          }
        break;
      }
      case 'Relaxed': {
        switch (this.newEmotion) {
            case 'Happy': {
              this.negativeChange = false;
              this.isLoading = false;
              break;
            }
            case 'Sad': {
              this.negativeChange = true;
              this.isLoading = false;
              break;
            }
            case 'Stressed': {
              this.negativeChange = true;
              this.isLoading = false;
              break;
            }
          }
        break;
      }
      case 'Sad': {
        switch (this.newEmotion) {
            case 'Happy': {
              this.negativeChange = false;
              this.isLoading = false;
              break;
            }
            case 'Relaxed': {
              this.negativeChange = false;
              this.isLoading = false;
              break;
            }
            case 'Stressed': {
              this.negativeChange = true;
              this.isLoading = false;
              break;
            }
          }
        break;
      }
      case 'Stressed': {
        switch (this.newEmotion) {
            case 'Happy': {
              this.negativeChange = false;
              this.isLoading = false;
              break;
            }
            case 'Relaxed': {
              this.negativeChange = false;
              this.isLoading = false;
              break;
            }
            case 'Sad': {
              this.negativeChange = false;
              this.isLoading = false;
              break;
            }
          }
        break;
      }
    }
  }
}
