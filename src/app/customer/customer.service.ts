import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from './customer.model';
import { tap, switchMap, take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // tslint:disable-next-line: variable-name
  private _customer: Customer = {
    id: 'c1',
    name: 'Tobias',
    imageUrl: 'https://www.vorname.com/cache/inline-images/tobias-images-name-moods-namensbild-t-m-jpg.m.40.600.png',
    emotion: 'Happy',
    lastEmotion: '',
    emotionHistory: [],
    currentShop: 'Kabinett24'
  };

  sendData() {
    return this.http
      .post<{name: string}>('https://comtem-9282e.firebaseio.com/customers.json', {...this.customer, id: null})
      .pipe(
        tap(resData => {
          this.customer.id = resData.name;
        })
      );
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  get customer() {
    return this._customer;
  }


}
