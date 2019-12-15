import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Retailer } from './retailer.model';
import { CustomerResData } from '../customer/customer.service';
import { Customer } from '../customer/customer.model';

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
    return this.http
      .post<{name: string}>('https://comtem-9282e.firebaseio.com/retailer.json', {...newRetailer, id: null})
      .pipe(
        tap(resData => {
          this._retailer.id = resData.name;
        })
      );
  }

  constructor(
    private http: HttpClient
  ) { }

  fetchingRetailer(email: string) {
    return this.http
      .get<{ [key: string]: RetailerResData}>(`https://comtem-9282e.firebaseio.com/retailer.json?orderBy="email"&equalTo="${email}"`)
      .pipe(map(resData => {
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
    return this.http
      .get<{ [key: string]: CustomerResData}>
        (`https://comtem-9282e.firebaseio.com/customers.json?orderBy="currentShop"&equalTo="${this._retailer.name}"`)
      .pipe(map(resData => {
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
