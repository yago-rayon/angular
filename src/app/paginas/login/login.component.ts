import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
//Servicios
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [NgModel]
})
export class LoginComponent {
    email: string = 'email';
    password: string = 'password';
    errorLogin: any = false;
    usuarioCreado: boolean;
    subscripcionUsuario: any;
    subscripcionParametros: any;
    constructor(public fb: FormBuilder, private http: HttpClient, private servicioAuth: AuthService, private ngModel: NgModel,
        private router: Router, private reactiveFormsModule: ReactiveFormsModule, private formsModule: FormsModule, private route: ActivatedRoute) {
    }

    ngOnInit() { 
        this.subscripcionUsuario = this.servicioAuth.misDatos().subscribe((data) => {
            if(data.usuario){
                this.router.navigate(['/inicio']);
            }
        });
        this.subscripcionParametros = this.route.queryParams.subscribe(params => {
            this.usuarioCreado = params['usuarioCreado'];
        });
    }

    ngOnDestroy() {
        this.subscripcionUsuario.unsubscribe();
        if (this.subscripcionParametros) {
            this.subscripcionParametros.unsubscribe();
          }
          if (this.subscripcionUsuario) {
            this.subscripcionUsuario.unsubscribe();
          }
    }

    enviarFormulario() {
        this.servicioAuth.login(this.email, this.password).subscribe({
            next: (response: any) => {
                localStorage.setItem('jwt', JSON.stringify(response.data));
                this.router.navigate(['/inicio']);
            },
            error: (data: any) => { this.errorLogin = true },
        });
    }
}
