import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//Servicios
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers:[NgModel]
})

export class RegistroComponent {
  email: string = 'email';
  password: string = 'password';
  nickname: string = 'nickname';
  errorLogin: any = null;
  subscripcionUsuario: any;
  constructor(public fb: FormBuilder, private http: HttpClient, private servicioAuth: AuthService, private ngModel: NgModel,
      private router: Router, private reactiveFormsModule: ReactiveFormsModule, private formsModule: FormsModule) {
  }

  ngOnInit() {
      this.subscripcionUsuario = this.servicioAuth.misDatos().subscribe((data) => {
          if(data.usuario){
              console.log('Llego el usuario')
          }
      });
  }

  ngOnDestroy() {
      this.subscripcionUsuario.unsubscribe();
  }

  enviarFormulario() {
      this.servicioAuth.registro(this.nickname, this.email, this.password).subscribe({
          next: (response: any) => {
              localStorage.setItem('jwt', JSON.stringify(response.data));
              this.router.navigate(['/novela']);
          },
          error: (data: any) => { this.errorLogin = data.error.error },
      });
  }
}
