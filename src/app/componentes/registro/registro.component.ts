// //Utilidades
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from 'src/app/servicios/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-registro',
//   templateUrl: './registro.component.html',
//   styleUrls: ['./registro.component.scss']
// })
// export class RegistroComponent {
//   form: FormGroup;
//   constructor(public fb: FormBuilder, private http: HttpClient, 
//     private authService: AuthService, private router: Router) {
//     this.form = this.fb.group({
//       email: [''],
//       nombre: [''],
//       password:['']
//     });
//   }

//   ngOnInit() {}
  
//   enviarFormulario() {
//     let nombre: string = this.form.get('nombre')!.value;
//     let email: string = this.form.get('email')!.value;
//     let password: string = this.form.get('password')!.value;
//     let data = {
//       "nombre":nombre,
//       "email":email,
//       "password":password
//     };
//     this.authService.registro(data).subscribe({
//       next: (response:any) => {
//         if(response.message == "Registro Exitoso"){
//           this.router.navigate(['/login']);
//         }else{
//           alert("Error al rellenar los campos");
//         }
//       },
//       error: (error:any) => {console.log(error); alert ("Usuario no existe")},
//     });
//   }
// }
