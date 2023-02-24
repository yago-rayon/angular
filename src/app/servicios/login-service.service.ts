import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): void {
    this.http.post(`localhost:8001/api/login_check`, { email, password })
      .pipe(
        map(response => {
          // login successful if there's a jwt token in the response
          if (response) {
            localStorage.setItem('jwt', JSON.stringify(response));
          }
        })
      );
  }
  

}
