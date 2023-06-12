import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    errorLogin: any = null;
    subscripcionUsuario: any;
    constructor(public fb: FormBuilder, private http: HttpClient, private servicioAuth: AuthService, private ngModel: NgModel,
        private router: Router, private reactiveFormsModule: ReactiveFormsModule, private formsModule: FormsModule) {
    }

    ngOnInit() {
        this.subscripcionUsuario = this.servicioAuth.misDatos().subscribe((data) => {
            console.log(data.usuario);
            if(data.usuario){
                console.log('Llego el usuario')
            }
        });
    }

    ngOnDestroy() {
        this.subscripcionUsuario.unsubscribe();
    }

    enviarFormulario() {
        this.servicioAuth.login(this.email, this.password).subscribe({
            next: (response: any) => {
                localStorage.setItem('jwt', JSON.stringify(response.data));
                this.router.navigate(['/novela']);
            },
            error: (data: any) => { this.errorLogin = data.error.error },
        });
    }
}
