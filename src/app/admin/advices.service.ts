import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advice } from '../retailer/advice.model';
import { AuthService } from '../auth/auth.service';
import { tap, map, switchMap, take } from 'rxjs/operators';

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
      return this.http.get<Advice[]>(`https://comtem-9282e.firebaseio.com/advices.json?auth=${token}"`);
     }), map(resData => {
       return resData;
     }), tap(resData => {
       console.log(resData);
     })
     );
  }
}
