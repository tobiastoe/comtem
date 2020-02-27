import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../customer.model';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pushup',
  templateUrl: './pushup.component.html',
  styleUrls: ['./pushup.component.scss'],
})
export class PushupComponent implements OnInit {
  @Input() customer: Customer;
  imageUrl: string;
  twoEmotions: string;

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    switch (this.customer.emotion) {
      case 'Happy': {
        this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/comtem-9282e.appspot.com/o/images%2F754ff516-647d-4aed-a766-f893238ad125-Happy.png?alt=media&token=754ff516-647d-4aed-a766-f893238ad125';
        this.twoEmotions = 'excited / happy';
        break;
      }
      case 'Relaxed': {
        this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/comtem-9282e.appspot.com/o/images%2F9e819d27-9792-456d-bbfa-98e56ed295ef-Relaxed.png?alt=media&token=9e819d27-9792-456d-bbfa-98e56ed295ef';
        this.twoEmotions = 'pleased / relaxed';
        break;
      }
      case 'Sad': {
        this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/comtem-9282e.appspot.com/o/images%2F6e61766e-916f-4025-95da-aa36ea422ba0-Sad.png?alt=media&token=6e61766e-916f-4025-95da-aa36ea422ba0';
        this.twoEmotions = 'sad / tired';
        break;
      }
      case 'Stressed': {
        this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/comtem-9282e.appspot.com/o/images%2F3bb6de0a-ce23-43e2-8557-7d3601aaa242-Stressed.png?alt=media&token=3bb6de0a-ce23-43e2-8557-7d3601aaa242';
        this.twoEmotions = 'angry / frustrated';
        break;
      }
  }
}

  onNavigate() {
    this.modalCtrl.dismiss(null, 'no');
    this.router.navigateByUrl('/customer/tabs/status');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'yes');
  }
}
