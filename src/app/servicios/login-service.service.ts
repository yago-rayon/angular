import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  urlApi = "http://localhost:8001"
  constructor(private http: HttpClient) { }

  login(email: string, password: string): any {
    return this.http.post(this.urlApi+`/api/login_check`, JSON.stringify({ "username" : email, "password" : password }));
  }

  registro(data:any): any{
    return this.http.post(this.urlApi+'/api/registro', data);
  }

}
