import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi = "http://localhost:3001"
  constructor(private http: HttpClient) { }

  login(email: string, password: string): any {
    return this.http.post(this.urlApi+`/api/login`, { "email" : email, "password" : password });
  }

  registro(data:any): any{
    return this.http.post(this.urlApi+'/api/registro', { "nickname": data.nickname, "email": data.email, "password": data.password });
  }

}
