import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from './customer.model';
import { tap, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { CustomerHistory } from './customer-history.model';
import { RetailerResData } from '../retailer/retailer.service';
import { Retailer } from '../retailer/retailer.model';
import { BehaviorSubject } from 'rxjs';

export interface CustomerResData {
  address: string;
  birthday: string;
  currentShop: string;
  email: string;
  emotion: string;
  emotionHistory: CustomerHistory[];
  imageUrl: string;
  lastEmotion: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customer: Customer;
  private _retailers = new BehaviorSubject<Retailer[]>([]);

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
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http
      .post<{name: string}>(`https://comtem-9282e.firebaseio.com/customers.json?auth=${token}`, {...newCustomer, id: null});
    }), tap(resData => {
          this.customer.id = resData.name;
        })
      );
  }

  fetchingCustomer(email: string) {
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http
      .get<{ [key: string]: CustomerResData}>
      (`https://comtem-9282e.firebaseio.com/customers.json?auth=${token}&orderBy="email"&equalTo="${email}"`);
    }), map(resData => {
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
              resData[key].emotionHistory,
              resData[key].currentShop);
          }
        }
        return currentCustomer;
        }),
        tap(currentCustomer => {
          this._customer = currentCustomer;
        })
      );
    }

  updateCustomer(customer: Customer) {
    this._customer = customer;
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http.put(`https://comtem-9282e.firebaseio.com/customers/${customer.id}.json?auth=${token}`,
        { ...customer, id: null}
      );
    }));
  }

  deleteEmotionHistory(customer: Customer) {
    this._customer.emotionHistory = null;
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http.delete(`https://comtem-9282e.firebaseio.com/customers/${customer.id}/emotionHistory.json?auth=${token}`);
    }));
  }

  deleteCurrentShop(customer: Customer) {
    this._customer.currentShop = null;
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http.delete(`https://comtem-9282e.firebaseio.com/customers/${customer.id}/currentShop.json?auth=${token}`);
    }));
  }

  fetchAllRetailers() {
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http
      .get<{ [key: string]: RetailerResData}>
        (`https://comtem-9282e.firebaseio.com/retailer.json?auth=${token}"`);
      }),
      map(resData => {
        const retailers = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            retailers.push(new Retailer(
              key,
              resData[key].name,
              resData[key].email,
              resData[key].address,
              resData[key].imageUrl,
            ));
          }
        }
        return retailers;
      }),
      tap(retailer => {
        this._retailers.next(retailer);
      })
  );
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  get customer() {
    return this._customer;
  }

  get retailers() {
    return this._retailers;
  }

  destroyUserData() {
    this._customer = null;
  }
}
