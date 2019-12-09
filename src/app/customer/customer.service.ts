import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from './customer.model';
import { tap, switchMap, take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // tslint:disable-next-line: variable-name
  private _customer: Customer = {
    id: 'c1',
    name: 'Tobias',
    email: 'test@test.com',
    address: 'Wilhelm-Bode-Strasse',
    imageUrl: 'https://www.vorname.com/cache/inline-images/tobias-images-name-moods-namensbild-t-m-jpg.m.40.600.png',
    birthday: null,
    emotion: 'Happy',
    lastEmotion: null,
    emotionHistory: [],
    currentShop: 'Kabinett24'
  };

  addCustomer(name: string, email: string, address: string, imageUrl: string, birthday: Date) {
    const newCustomer = new Customer(
      Math.random().toString(),
      name,
      email,
      address,
      imageUrl,
      birthday,
      '',
      '',
      [],
      '',
    );
    return this.http
      .post<{name: string}>('https://comtem-9282e.firebaseio.com/customers.json', {...newCustomer, id: null})
      .pipe(
        tap(resData => {
          this.customer.id = resData.name;
        })
      );
  }

  fetchingCustomer() {
    // return this.http
    // .get<{Customer}>(`https://comtem-9282e.firebaseio.com/customers.json?orderBy="userId"&equalTo="${this.authService.userId}"`)
    // .pipe(
    //   tap(resData => {
    //     this._customer = resData;
    //   })
    // );
    return this.http
      .get(`https://comtem-9282e.firebaseio.com/customers.json?orderBy="email"&equalTo="test2@test.com"`)
      .pipe(tap(resData => {
        console.log(resData);
      }));
    }

  constructor(private authService: AuthService, private http: HttpClient) {}

  get customer() {
    return this._customer;
  }
}
