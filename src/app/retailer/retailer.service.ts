import { Injectable } from '@angular/core';

import { Retailer } from './retailer.model';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

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

  }
}
