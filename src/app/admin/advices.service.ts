import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advice } from '../retailer/advice.model';
import { AuthService } from '../auth/auth.service';
import { tap, map, switchMap, take } from 'rxjs/operators';
import { AdviceResData } from '../retailer/retailer.service';

@Injectable({
  providedIn: 'root'
})
export class AdvicesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addNewAdvice(oldEmotion: string, newEmotion: string, description: string) {
    const newAdvice = new Advice (
      null,
      oldEmotion,
      newEmotion,
      description,
      null,
      null,
    );
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http
      .post<{name: string}>(`https://comtem-9282e.firebaseio.com/advices.json?auth=${token}`, newAdvice);
    })
    );
  }

  fetchAdvices() {
      return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http.get<{ [key: string]: AdviceResData}>
        (`https://comtem-9282e.firebaseio.com/advices.json?auth=${token}"`);
      }), map(resData => {
        const allAdvices: Advice [] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            allAdvices.push(
              new Advice(
                key,
                resData[key].oldEmotion,
                resData[key].newEmotion,
                resData[key].description,
                resData[key].customerRating,
                resData[key].retailerRating,
              ));
          }
        }
        return allAdvices;
      }), tap(resData => {
        // this._advice.next(resData);
      })
      );
    }

  deleteAdvice(advice: Advice) {
    console.log(advice.key);
    return this.authService.token.pipe(take(1), switchMap(token => {
      return this.http.delete(`https://comtem-9282e.firebaseio.com/advices/${advice.key}.json?auth=${token}"`);
      }
    ));
  }
}
