import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RetailerService } from './retailer.service';
import { Retailer } from './retailer.model';
import { Customer } from '../customer/customer.model';
import { ModalController, AlertController, MenuController, IonItemSliding } from '@ionic/angular';
import { ViewCustomerDetailsComponent } from './view-customer-details/view-customer-details.component';
import { Advice } from './advice.model';
import { AdviceRatingComponent } from './advice-rating/advice-rating.component';
import { AlertEmotionChangeComponent } from './alert-emotion-change/alert-emotion-change.component';
import { AlertCustomerEntersComponent } from './alert-customer-enters/alert-customer-enters.component';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.page.html',
  styleUrls: ['./retailer.page.scss'],
})
export class RetailerPage implements OnInit, OnDestroy {
  loadedRetailer: Retailer;
  isLoading = false;
  private retailerSub: Subscription;
  customersinShop: Customer[];
  customersinShopPast: Customer[];
  isRefreshing = true;
  areCustomersinShop = false;
  email;
  messageList: string[] = [];

  constructor(
    private authService: AuthService,
    private retailerService: RetailerService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.email = this.authService.userEmail;
    this.retailerSub = this.retailerService.fetchingRetailer(this.email).subscribe(retailer => {
      this.loadedRetailer = retailer;
      this.retailerService.fetchingCustomersInShop(this.loadedRetailer.name).subscribe(customers => {
        if (customers.length !== 0) {
          this.areCustomersinShop = true;
          this.customersinShopPast = customers;
        } else if (customers.length === 0) {
          this.areCustomersinShop = false;
          this.customersinShopPast = null;
        }
        this.isLoading = false;
      });
    });
    this.menuCtrl.enable(true, 'retailer');
    this.menuCtrl.enable(false, 'customer');
    this.menuCtrl.enable(false, 'admin');
    this.getData();
  }

  getData() {
    this.customersinShopPast = this.customersinShop;
    this.retailerSub = this.retailerService.fetchingRetailer(this.email).subscribe(retailer => {
      this.loadedRetailer = retailer;
      this.retailerService.fetchingCustomersInShop(this.loadedRetailer.name).subscribe(customers => {
        if (customers.length !== 0) {
          this.areCustomersinShop = true;
          this.customersinShop = customers;
        } else if (customers.length === 0) {
          this.areCustomersinShop = false;
          this.customersinShop = null;
        }
        this.isLoading = false;
        if (this.customersinShop !== this.customersinShopPast) {
          this.compareCustomerData(this.customersinShopPast, this.customersinShop);
        }
      }
      );
    }, errRes => {
      this.isRefreshing = false;
    });
    if (this.isRefreshing) {
      setTimeout(() => {
        this.getData();
      }, 3000);
    }
  }

  compareCustomerData(pastCustomerData: Customer[], currentCustomerData: Customer[]) {
    let match = false;
    if (!pastCustomerData) {
      this.retailerService.getAdvice('Entered', currentCustomerData[0].emotion).subscribe(resData => {
        const randomAdvice: Advice = resData[Math.floor(Math.random() * resData.length)];
        if (randomAdvice) {
          this.showAlertEntered(currentCustomerData[0], randomAdvice.description, currentCustomerData[0].emotion);
          this.askForAdviceRating(currentCustomerData[0], randomAdvice);
        } else {
          this.showAlertEntered(currentCustomerData[0], '', currentCustomerData[0].emotion);
        }
      });
      return;
    } else if (!currentCustomerData) {
      this.showAlertLeft('You have done your best!', pastCustomerData[0], 'left');
      return;
    }

    for (const currentCustomer of currentCustomerData) {
      let j = pastCustomerData.length;
      const newEmotion = currentCustomer.emotion;
      for (const pastCustomer of pastCustomerData) {
        if (currentCustomer.email === pastCustomer.email) {
          match = true;
          const oldEmotion = pastCustomer.emotion;
          if (newEmotion !== oldEmotion) {
            this.retailerService.getAdvice(oldEmotion, newEmotion).subscribe(resData => {
              const randomAdvice: Advice = resData[Math.floor(Math.random() * resData.length)];
              if (randomAdvice) {
                this.showAlertEmotionChange(randomAdvice.description, currentCustomer, oldEmotion, newEmotion);
                this.askForAdviceRating(currentCustomer, randomAdvice);
              } else {
                this.showAlertEmotionChange(null, currentCustomer, oldEmotion, newEmotion);
              }
            });
          }
        }
        j -= 1;
        if (j === 0 && !match) {
          this.retailerService.getAdvice('Entered', currentCustomer.emotion).subscribe(resData => {
            const randomAdvice: Advice = resData[Math.floor(Math.random() * resData.length)];
            if (randomAdvice) {
              this.showAlertEntered(currentCustomer, randomAdvice.description, currentCustomer.emotion);
              this.askForAdviceRating(currentCustomer, randomAdvice);
            } else {
              this.showAlertEntered(currentCustomer, '', currentCustomer.emotion);
            }
          });
        }
      }
      match = false;
    }
    for (const pastCustomer of pastCustomerData) {
      let i = currentCustomerData.length;
      for (const currentCustomer of currentCustomerData) {
        if (pastCustomer.email === currentCustomer.email) {
          match = true;
        }
        i -= 1;
        if (i === 0 && !match) {
          this.showAlertLeft('You have done your best.', pastCustomer, 'left');
        }
      }
      match = false;
    }
  }

  ngOnDestroy() {
    if (this.retailerSub) {
      this.retailerSub.unsubscribe();
    }
  }

  askForAdviceRating(customer: Customer, advice: Advice) {
    // ENTFERNT FÜR NUTZERTEST
    // setTimeout(() => {
    //   if (this.authService.userEmail) {
    //     this.modalCtrl
    //     .create({
    //       component: AdviceRatingComponent,
    //       cssClass: 'modal-retailer-advice-css',
    //       componentProps: {customer, advice}
    //     })
    //     .then(modalEl => {
    //     modalEl.present();
    //     });
    //   } else {
    //     return;
    //   }
    // }, 30000);
  }

  viewCustomer(customer: Customer, retailer: Retailer) {
    this.modalCtrl
    .create({
      component: ViewCustomerDetailsComponent,
      componentProps: {customer, retailer}
    })
    .then(modalEl => {
      modalEl.present();
    });
  }

  addItemToCurrentChanges(customer: Customer, oldEmotion: string, newEmotion: string) {
    let twoEmotionsOld;
    let twoEmotionsNew;
    let newMessage;

    switch (oldEmotion) {
      case 'Happy': {
        twoEmotionsOld = 'excited';
        break;
      }
      case 'Relaxed': {
        twoEmotionsOld = 'satisfied';
        break;
      }
      case 'Sad': {
        twoEmotionsOld = 'sad';
        break;
      }
      case 'Stressed': {
        twoEmotionsOld = 'annoyed';
        break;
      }
    }
    switch (newEmotion) {
      case 'Happy': {
        twoEmotionsNew = 'excited';
        break;
      }
      case 'Relaxed': {
        twoEmotionsNew = 'satisfied';
        break;
      }
      case 'Sad': {
        twoEmotionsNew = 'sad';
        break;
      }
      case 'Stressed': {
        twoEmotionsNew = 'annoyed';
        break;
      }
    }

    if (oldEmotion) {
      newMessage = customer.name + ' emotion changed from ' + twoEmotionsOld + ' to ' + twoEmotionsNew + '!';
    } else if (!oldEmotion && newEmotion) {
      newMessage = customer.name + ' has entered your shop. ' + customer.name + ' is feeling ' + twoEmotionsNew + '!';
    } else {
      newMessage = customer.name + ' has left your shop. ';
    }
    this.messageList.push(newMessage);
  }

  clearList() {
    this.messageList = [];
  }

  private showAlertEmotionChange(message: string, customer: Customer, oldEmotion: string, newEmotion: string) {
    this.addItemToCurrentChanges (customer, oldEmotion, newEmotion);
    this.modalCtrl
      .create({
        component: AlertEmotionChangeComponent,
        cssClass: 'modal-retailer-emotion-css',
        componentProps: {customer, oldEmotion, newEmotion, message}
      })
      .then(modalEl => {
        modalEl.present();
      });
  }

  private showAlertEntered(customer: Customer, message: string, customerEmotion: string) {
    this.addItemToCurrentChanges (customer, null, customerEmotion);
    this.modalCtrl
    .create({
      component: AlertCustomerEntersComponent,
      cssClass: 'modal-retailer-emotion-css',
      componentProps: {customer, message, customerEmotion}
    })
    .then(modalEl => {
      modalEl.present();
    });
  }

  deleteMessage(message: string, slidingMessage: IonItemSliding) {
    slidingMessage.close();
    const index = this.messageList.indexOf(message, 0);
    this.messageList.splice(index, 1);
  }

  private showAlertLeft(message: string,  customer: Customer, verb: string) {
    this.alertCtrl.create(
      {header: `${customer.name} has ${verb} your shop!`,
      message,
      buttons: ['Okay']}).then(alertEl => alertEl.present());
    // ab hier: für NUTZERTEST hinzugefügt
    setTimeout(() => {
      this.alertCtrl.dismiss();
      }, 15000);
  }

  switchRefreshingMode() {
    this.isRefreshing = !this.isRefreshing;
    if (this.isRefreshing) {
      this.getData();
    }
  }
}
