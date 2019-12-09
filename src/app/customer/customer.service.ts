import { Injectable } from '@angular/core';
import { Customer } from './customer.model';

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
    emotionHistory: [{
      emotion: 'Happy',
      time: 'Friday',
      shop: 'Kabinett24'
    }, {
      emotion: 'Sad',
      time: 'Saturday',
      shop: 'Kabinett24'
    }],
    currentShop: 'Kabinett24'
  };

  get customer() {
    return this._customer;
  }


  constructor() { }
}
