import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from './customer.model';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { CustomerHistory } from './customer-history.model';

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

  fetchingCustomer(email: string) {
    return this.http
      .get<{ [key: string]: CustomerResData}>(`https://comtem-9282e.firebaseio.com/customers.json?orderBy="email"&equalTo="${email}"`)
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

  updateCustomerEmotion(customer: Customer) {
    return this.http.put(`https://comtem-9282e.firebaseio.com/customers/${customer.id}.json`,
    { ...customer, id: null}
    );
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  get customer() {
    return this._customer;
  }
}
