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
  }

  deleteAdvice(advice: Advice, slidingAdvice: IonItemSliding) {
    slidingAdvice.close();
    const index = this.advices.indexOf(advice, 0);
    this.advices.splice(index, 1);
    this.advicesService.deleteAdvice(advice).subscribe(() => {
      this.leaveMessage = 'confirm';
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, this.leaveMessage);
  }
}
