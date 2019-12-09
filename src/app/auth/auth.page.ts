import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private customerService: CustomerService
    ) { }

  ngOnInit() {
  }

  authenticate(email: string, password: string, name: string, address: string, imageUrl: string, birthday: Date) {
    let loadingMessage;
    if (this.isLogin) {
      loadingMessage = 'Logging in...';
    } else {
      loadingMessage = 'Signing up...';
    }
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: loadingMessage})
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(resData => {
          console.log(resData);
          this.isLoading = false;
          loadingEl.dismiss();
          this.customerService.addCustomer(name, email, address, imageUrl, birthday).subscribe();
          this.router.navigateByUrl('/customer/tabs/status');
        }, errRes => {
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          let message = 'Could not sign you up, please try again.';
          if (code === 'EMAIL_EXISTS') {
            message = 'This email address exists already!';
          } else if (code === 'EMAIL_NOT_FOUND') {
            message = 'E-Mail address could not be found.';
          } else if (code === 'INVALID_PASSWORD') {
            message = 'This password is not correct.';
          }
          this.showAlert(message);
        });
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    const address = form.value.address;
    const imageUrl = form.value.imageUrl;
    const birthday = form.value.birthday;

    this.authenticate(email, password, name, address, imageUrl, birthday);
    form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl.create({header: 'Authentication failed', message, buttons: ['Okay']}).then(alertEl => alertEl.present());
  }
}
