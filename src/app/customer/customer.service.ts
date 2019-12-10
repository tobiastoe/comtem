import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from './customer.model';
import { tap, switchMap, take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { stringify } from 'querystring';

export interface CustomerResData {
  address: string;
  birthday: string;
  currentShop: string;
  email: string;
  emotion: string;
  imageUrl: string;
  lastEmotion: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customer: Customer;
  // = {
  //   id: 'c1',
  //   name: 'Tobias',
  //   email: 'test@test.com',
  //   address: 'Wilhelm-Bode-Strasse',
  //   imageUrl: 'https://www.vorname.com/cache/inline-images/tobias-images-name-moods-namensbild-t-m-jpg.m.40.600.png',
  //   birthday: null,
  //   emotion: 'Happy',
  //   lastEmotion: null,
  //   emotionHistory: [],
  //   currentShop: 'Kabinett24'
  // };

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
    return this.http
      .get<{ [key: string]: CustomerResData}>(`https://comtem-9282e.firebaseio.com/customers.json?orderBy="email"&equalTo="test2@test.com"`)
      .pipe(map(resData => {
        let currentCustomer = null;
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            currentCustomer = new Customer (
              key,
              resData[key].name,
              resData[key].email,
              resData[key].address,
              resData[key].imageUrl,
              new Date(resData[key].birthday),
              resData[key].emotion,
              resData[key].lastEmotion,
              [],
              resData[key].currentShop);
          }
        }
        return currentCustomer;
        }),
        tap(currentCustomer => {
          this._customer = currentCustomer;
          console.log(this._customer);
        })
      );
    }

  constructor(private authService: AuthService, private http: HttpClient) {}

  get customer() {
    return this._customer;
  }
}
