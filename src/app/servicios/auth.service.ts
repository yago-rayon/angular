import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Constantes } from '../constantes/constantes';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi = Constantes.urlApi;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): any {
    return this.http.post(this.urlApi+'/auth/login', { "email" : email, "password" : password });
  }

  registro(data:any): any{
    return this.http.post(this.urlApi+'/auth/registro', { "nickname": data.nickname, "email": data.email, "password": data.password });
  }
  misDatos(): any{
    return this.http.get(this.urlApi+'/misDatos');
  }
}
