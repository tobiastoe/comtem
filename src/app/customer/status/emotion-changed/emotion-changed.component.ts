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

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    switch (this.emotion) {
      case 'Happy': {
        this.imageUrl = 'http://pngimg.com/uploads/smiley/smiley_PNG79.png';
        break;
      }
      case 'Relaxed': {
        this.imageUrl = 'http://pngimg.com/uploads/smiley/smiley_PNG86.png';
        break;
      }
      case 'Sad': {
        this.imageUrl = 'http://pngimg.com/uploads/smiley/smiley_PNG113.png';
        break;
      }
      case 'Stressed': {
        this.imageUrl = 'http://pngimg.com/uploads/smiley/smiley_PNG124.png';
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
