import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-emotion-changed',
  templateUrl: './emotion-changed.component.html',
  styleUrls: ['./emotion-changed.component.scss'],
})
export class EmotionChangedComponent implements OnInit {
  @Input() emotion: string;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.onCancel();
      }, 2000);
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
