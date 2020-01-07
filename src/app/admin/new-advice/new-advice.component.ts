import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-advice',
  templateUrl: './new-advice.component.html',
  styleUrls: ['./new-advice.component.scss'],
})
export class NewAdviceComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const oldEmotion = form.value.oldEmotion.toLowerCase();
    const newEmotion = form.value.newEmotion.toLowerCase();
    const description = form.value.description;

    console.log(oldEmotion, newEmotion, description);
    form.reset();

    this.modalCtrl.dismiss({ message: 'New Advice has been created!'}, 'confirm');
  }
}
