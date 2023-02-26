import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//Servicios
import { LoginServiceService } from 'src/app/servicios/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  constructor(public fb: FormBuilder, private http: HttpClient, private servicioLogin: LoginServiceService,
    private router: Router) {
    this.form = this.fb.group({
      email: [''],
      password:['']
    });
  }

  ngOnInit() {}

  enviarFormulario() {
    let email: string = this.form.get('email')!.value;
    let password: string = this.form.get('password')!.value;

    this.servicioLogin.login(email,password).subscribe({
      next: (response:any) => {
        localStorage.setItem('jwt', JSON.stringify(response));
        this.router.navigate(['/tablaAutores']);
      },
      error: (error:any) => {alert("error")},
    });
  }
}
