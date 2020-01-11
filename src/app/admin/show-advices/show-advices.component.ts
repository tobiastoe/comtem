import { Component, OnInit, Input } from '@angular/core';
import { Advice } from 'src/app/retailer/advice.model';
import { AdvicesService } from '../advices.service';
import { ModalController } from '@ionic/angular';

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


  constructor(
    private advicesService: AdvicesService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.oldEmotion = this.oldEmotion;
    this.newEmotion = this.newEmotion;
  }

  deleteAdvice(advice: Advice) {
    this.advicesService.deleteAdvice(advice).subscribe(() => {
      this.leaveMessage = 'confirm';
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, this.leaveMessage);
  }
}
