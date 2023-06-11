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
    errorLogin:any = null;
    constructor(public fb: FormBuilder, private http: HttpClient, private servicioAuth: AuthService, private ngModel: NgModel,
        private router: Router, private reactiveFormsModule: ReactiveFormsModule, private formsModule: FormsModule) {
    }

    ngOnInit() {}

    enviarFormulario() {
        console.log(this.email, this.password)
        this.servicioAuth.login(this.email,this.password).subscribe({
            next: (response: any) => {
                localStorage.setItem('jwt', JSON.stringify(response));
                this.router.navigate(['/novela']);
            },
            error: (error: any) => { this.errorLogin = error.error.error },
        });
    }
}
