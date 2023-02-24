//Utilidades
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from 'src/app/servicios/login-service.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  form: FormGroup;
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      email: [''],
      nombre: [''],
      password:['']
    });
  }

  ngOnInit() {}
  enviarFormulario() {
    let nombre: string = this.form.get('nombre')!.value;
    let email: string = this.form.get('email')!.value;
    let password: string = this.form.get('password')!.value;
    let data = {
      "nombre":nombre,
      "email":email,
      "password":password
    };
    this.http
      .post('http://localhost:8001/api/registro', data)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }
}
