import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { ModalController } from '@ionic/angular';

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
  twoEmotionsOld: string;
  twoEmotionsNew: string;
  isOpen = true;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.isLoading = true;
    this.checkS();
    this.checkChange();
    switch (this.oldEmotion) {
      case 'Happy': {
        this.twoEmotionsOld = 'excited / happy';
        break;
      }
      case 'Relaxed': {
        this.twoEmotionsOld = 'pleased / relaxed';
        break;
      }
      case 'Sad': {
        this.twoEmotionsOld = 'sad / tired';
        break;
      }
      case 'Stressed': {
        this.twoEmotionsOld = 'angry / frustrated';
        break;
      }
    }
    switch (this.newEmotion) {
      case 'Happy': {
        this.twoEmotionsNew = 'excited / happy';
        break;
      }
      case 'Relaxed': {
        this.twoEmotionsNew = 'pleased / relaxed';
        break;
      }
      case 'Sad': {
        this.twoEmotionsNew = 'sad / tired';
        break;
      }
      case 'Stressed': {
        this.twoEmotionsNew = 'angry / frustrated';
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

  checkS() {
    if (Array.from(this.customer.name)[Array.from(this.customer.name).length - 1] === 's') {
      this.endingS = true;
    }
  }

  twoEmotions(emotion: string, oldOrNew: string) {
    switch (emotion) {
      case 'Happy': {
        if (oldOrNew === 'Old') {
          this.twoEmotionsOld = 'excited / happy';
          break;
        } else if (oldOrNew === 'New') {
          this.twoEmotionsNew = 'excited / happy';
          break;
        }
        break;
      }
      case 'Relaxed': {
        if (oldOrNew === 'Old') {
          this.twoEmotionsOld = 'satisfied / relaxed';
          break;
        } else if (oldOrNew === 'New') {
          this.twoEmotionsNew = 'satisfied / relaxed';
          break;
        }
        break;
      }
      case 'Sad': {
        if (oldOrNew === 'Old') {
          this.twoEmotionsOld = 'sad / exhausted';
          break;
        } else if (oldOrNew === 'New') {
          this.twoEmotionsNew = 'sad / exhausted';
          break;
        }
        break;
      }
      case 'Stressed': {
        if (oldOrNew === 'Old') {
          this.twoEmotionsOld = 'annoyed / concerned';
          break;
        } else if (oldOrNew === 'New') {
          this.twoEmotionsNew = 'annoyed / concerned';
          break;
        }
        break;
      }
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
