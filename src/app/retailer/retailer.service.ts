import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, take } from 'rxjs/operators';

import { Retailer } from './retailer.model';
import { CustomerResData } from '../customer/customer.service';
import { Customer } from '../customer/customer.model';
import { AuthService } from '../auth/auth.service';

export interface RetailerResData {
  address: string;
  email: string;
  imageUrl: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RetailerService {
  private _retailer: Retailer;
  private _customersInShop= new BehaviorSubject<Customer[]>([]);

  addRetailer(name: string, email: string, address: string, imageUrl: string) {
    const newRetailer = new Retailer(
      Math.random().toString(),
      name,
      email,
      address,
      imageUrl,
    );
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http
        .post<{name: string}>(`https://comtem-9282e.firebaseio.com/retailer.json?auth=${token}`, {...newRetailer, id: null});
    }),
      tap(resData => {
        this._retailer.id = resData.name;
      })
    );
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  fetchingRetailer(email: string) {
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http
        .get<{ [key: string]: RetailerResData}>
        (`https://comtem-9282e.firebaseio.com/retailer.json?auth=${token}&orderBy="email"&equalTo="${email}"`);
    }),
      map(resData => {
        let currentRetailer = null;
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            currentRetailer = new Retailer (
              key,
              resData[key].name,
              resData[key].email,
              resData[key].address,
              resData[key].imageUrl);
          }
        }
        return currentRetailer;
        }),
        tap(currentRetailer => {
          this._retailer = currentRetailer;
        })
      );
    }

  fetchingCustomersInShop(currentShop: string) {
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http
        .get<{ [key: string]: CustomerResData}>
          (`https://comtem-9282e.firebaseio.com/customers.json?auth=${token}&orderBy="currentShop"&equalTo="${this._retailer.name}"`);
    }),
      map(resData => {
        const customersInShop = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            customersInShop.push(new Customer(
              key,
              resData[key].name,
              resData[key].email,
              resData[key].address,
              resData[key].imageUrl,
              new Date(resData[key].birthday),
              resData[key].emotion,
              resData[key].lastEmotion,
              resData[key].emotionHistory,
              resData[key].currentShop
            ));
          }
        }
        return customersInShop;
        }),
        tap(customersInShop => {
          this._customersInShop.next(customersInShop);
        })
      );
    }
}
