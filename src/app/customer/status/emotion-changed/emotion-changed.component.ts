import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-emotion-changed',
  templateUrl: './emotion-changed.component.html',
  styleUrls: ['./emotion-changed.component.scss'],
})
export class EmotionChangedComponent implements OnInit {
  @Input() emotion: string;
  imageUrl: string;
  isLoading = true;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    switch (this.emotion) {
      case 'Happy': {
        this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/comtem-9282e.appspot.com/o/images%2F754ff516-647d-4aed-a766-f893238ad125-Happy.png?alt=media&token=754ff516-647d-4aed-a766-f893238ad125';
        this.isLoading = false;
        break;
      }
      case 'Relaxed': {
        this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/comtem-9282e.appspot.com/o/images%2F9e819d27-9792-456d-bbfa-98e56ed295ef-Relaxed.png?alt=media&token=9e819d27-9792-456d-bbfa-98e56ed295ef';
        this.isLoading = false;
        break;
      }
      case 'Sad': {
        this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/comtem-9282e.appspot.com/o/images%2F6e61766e-916f-4025-95da-aa36ea422ba0-Sad.png?alt=media&token=6e61766e-916f-4025-95da-aa36ea422ba0';
        this.isLoading = false;
        break;
      }
      case 'Stressed': {
        this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/comtem-9282e.appspot.com/o/images%2F3bb6de0a-ce23-43e2-8557-7d3601aaa242-Stressed.png?alt=media&token=3bb6de0a-ce23-43e2-8557-7d3601aaa242';
        this.isLoading = false;
        break;
      }
    }

    setTimeout(() => {
      this.onCancel();
      }, 2000);
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
