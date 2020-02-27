import { Component, OnInit, Input } from '@angular/core';
import { Advice } from 'src/app/retailer/advice.model';
import { AdvicesService } from '../advices.service';
import { ModalController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-show-advices',
  templateUrl: './show-advices.component.html',
  styleUrls: ['./show-advices.component.scss'],
})
export class ShowAdvicesComponent implements OnInit {
  @Input() oldEmotion: string;
  @Input() newEmotion: string;
  @Input() advices: Advice[];

  leaveMessage = 'cancel';
  relevantAdvices: Advice[] = [];
  average = list => list.reduce((prev, curr) => prev + curr) / list.length;

  constructor(
    private advicesService: AdvicesService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    for (const advice of this.advices) {
      if (this.oldEmotion === advice.oldEmotion && this.newEmotion === advice.newEmotion) {
        this.relevantAdvices.push(advice);
      }
    }
    switch (this.oldEmotion) {
      case 'Happy':
      this.oldEmotion = 'Excited';
      break;
      case 'Relaxed':
      this.oldEmotion = 'Pleased';
      break;
      case 'Stressed':
      this.oldEmotion = 'Angry';
      break;
    }
    switch (this.newEmotion) {
      case 'Happy':
      this.newEmotion = 'Excited';
      break;
      case 'Relaxed':
      this.newEmotion = 'Pleased';
      break;
      case 'Stressed':
      this.newEmotion = 'Angry';
      break;
    }
  }

  deleteAdvice(advice: Advice, slidingAdvice: IonItemSliding) {
    slidingAdvice.close();
    const index = this.advices.indexOf(advice, 0);
    this.advices.splice(index, 1);
    this.advicesService.deleteAdvice(advice).subscribe(() => {
      this.leaveMessage = 'confirm';
      this.onCancel();
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, this.leaveMessage);
  }
}
