// import { Component } from '@angular/core';
// import { DecimalPipe, NgFor } from '@angular/common';
// import { Router } from '@angular/router';
// //Servicios
// import { AutoresService } from 'src/app/servicios/autores.service';
// //Interfaces
// import { Autor } from '../../interfaces/usuario';



// @Component({
//   selector: 'app-tabla-autores',
//   templateUrl: './tabla-autores.component.html',
//   styleUrls: ['./tabla-autores.component.scss']
// })
// export class TablaAutoresComponent {
//   autores: Autor[] = [];
//   logueado: boolean = false;
//   constructor(private servicioAutores: AutoresService, private router: Router) { }

//   ngOnInit() {
//     if (localStorage.getItem('jwt')){
//       this.logueado=true;
//     }
//     this.consultarAutores();
//   }

//   ordenar(atributo:string){
//     if(atributo=='fechaNacimiento'){
//       this.autores = this.autores.sort(
//         (a:any,b:any)=>new Date(a[atributo]).getTime()-new Date(b[atributo]).getTime()
//         );
//     }
//     this.autores = this.autores.sort(
//       (a:any,b:any)=>a[atributo].localeCompare(b[atributo])
//       );
//   }
//   consultarAutores() {
//     this.servicioAutores.consultarTodosAutores()
//       .subscribe(datos => { this.autores = datos; });
//   }
//   borrar(autor: Autor) {
//     this.servicioAutores.borrarAutor(autor)
//       .subscribe(
//         respuesta => {
//           if (respuesta.code == 201) {
//             alert("Autor Borrado");
//             this.ngOnInit;
//             // this.router.navigate(['/autores']);
//           } else {
//             alert("Ha ocurrido algún error al rellenar los campos");
//           }
//         },
//         error => {
//           if (error.status == 401) {
//             localStorage.removeItem('jwt');
//             alert("Token expirado o inválido");
//             this.router.navigate(['/login']);
//           } else {
//             alert(error.message);
//           }
//         });
//   }
//   editar(autor: Autor) {
//     this.router.navigate(['/editarAutor/' + autor.id]);
//   }
// }
