import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AdvicesService } from '../advices.service';

@Component({
  selector: 'app-new-advice',
  templateUrl: './new-advice.component.html',
  styleUrls: ['./new-advice.component.scss'],
})
export class NewAdviceComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private advicesService: AdvicesService,
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const oldEmotion = form.value.oldEmotion;
    const newEmotion = form.value.newEmotion;
    const description = form.value.description;

    form.reset();

    this.advicesService.addNewAdvice(oldEmotion, newEmotion, description).subscribe();

    this.modalCtrl.dismiss({oldEmotion, newEmotion, description}, 'confirm');
  }
}
