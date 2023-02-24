import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(nombre: string, email: string, password: string): void {
    this.http.post(`localhost:8001/api/login_check`, { nombre, email, password })
      .subscribe({
        next: (response) => localStorage.setItem('jwt', JSON.stringify(response)),
        error: (error) => console.log(error),
      });
  }


}
