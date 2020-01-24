import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { CustomerService } from '../customer/customer.service';
import { RetailerService } from '../retailer/retailer.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form: FormGroup;
  isLogin = true;
  isLoading = false;
  isRetailer = false;
  imageUrl = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private customerService: CustomerService,
    private retailerService: RetailerService
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null)
    });
  }

  ionViewWillEnter() {
    this.isLogin = true;
    this.isRetailer = false;
  }

  authenticate(email: string, password: string, name: string, address: string, birthday: Date) {
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
          this.isLoading = false;
          loadingEl.dismiss();
          if (email === 'admin@wi2.com') {
            this.router.navigateByUrl('/admin');
            return null;
          }
          if (!this.isLogin) {
            if (!this.isRetailer) {
              this.retailerService.uploadImage(this.form.get('image').value).subscribe(uploadRes => {
                this.imageUrl = uploadRes.imageUrl;
                console.log(this.imageUrl);
                this.customerService.addCustomer(name, email, address, this.imageUrl, birthday).subscribe(() => {
                  this.router.navigateByUrl('/customer/tabs/status');
              });
              });
            } else if (this.isRetailer) {
              this.retailerService.uploadImage(this.form.get('image').value).subscribe(uploadRes => {
                this.imageUrl = uploadRes.imageUrl;
                console.log(this.imageUrl);
                this.retailerService.addRetailer(name, email, address, this.imageUrl).subscribe(() => {
                  this.router.navigateByUrl('/retailer');
                });
              });
            }
          } else if (this.isLogin) {
            this.customerService.fetchingCustomer(email).subscribe(resDat => {
              if (resDat) {
                this.router.navigateByUrl('/customer/tabs/status');
              } else {
                this.router.navigateByUrl('/retailer');
            }
          });
          }
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
    this.isRetailer = false;
  }

  onSwitchRetailerMode() {
    this.isRetailer = !this.isRetailer;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    const address = form.value.address;
    const birthday = form.value.birthday;

    this.authenticate(email, password, name, address, birthday);
    form.reset();
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = this.base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  private showAlert(message: string) {
    this.alertCtrl.create({header: 'Authentication failed', message, buttons: ['Okay']}).then(alertEl => alertEl.present());
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
