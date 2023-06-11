// //Utilidades
// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { DecimalPipe, NgFor } from '@angular/common';

// //Servicios
// import { AutoresService } from 'src/app/servicios/autores.service';
// import { LibrosService } from 'src/app/servicios/libros.service';
// //Interfaces
// import { Autor } from 'src/app/interfaces/usuario';
// import { Libro } from 'src/app/interfaces/novela';


// @Component({
//   selector: 'app-crear-libro',
//   templateUrl: './crear-libro.component.html',
//   styleUrls: ['./crear-libro.component.scss']
// })
// export class CrearLibroComponent {
//   logueado : boolean = false;
//   titulo = "ALTA libro";
//   libro: Libro = {
//     "id": "",
//     "titulo": "",
//     "precio": 0,
//     "imagen": "",
//     "descripcion": "",
//     "archivo": "",
//     "isbn": "",
//     "idAutor":"",
//     "nombreAutor":""
//   };
//   autores: Autor[]=[];
//   imagenASubir: File | null = null;
//   archivoASubir: File | null = null;

//   constructor(private servicioLibros: LibrosService,
//     private servicioAutores: AutoresService,
//     private router: Router,
//     private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     if (localStorage.getItem('jwt')){
//       this.logueado=true;
//     }
//     this.route.params.subscribe(parametro => {
//       if (parametro['id']) {
//         this.titulo = "EDITAR LIBRO";
//         this.servicioLibros.consultarLibro(parametro['id'])
//           .subscribe(libro => this.libro = libro);
//       }
//     });
//     this.servicioAutores.consultarTodosAutores()
//           .subscribe(autores => this.autores = autores);
//   }
  

//   darAlta() {
//     let formData: FormData = new FormData();
//     formData.append('titulo', this.libro.titulo);
//     formData.append('precio', this.libro.precio.toString());
//     formData.append('isbn', this.libro.isbn);
//     formData.append('idAutor', this.libro.idAutor);
//     formData.append('descripcion', this.libro.descripcion);
    
//     if (this.imagenASubir) {
//       formData.append('imagen', this.imagenASubir, this.imagenASubir.name);
//     } else {
//       formData.append('imagen', this.libro.imagen);
//     }
//     if (this.archivoASubir) {
//       formData.append('archivo', this.archivoASubir, this.archivoASubir.name);
//     } else {
//       formData.append('archivo', this.libro.archivo);
//     }
//     this.servicioLibros.altaLibro(formData)
//     .subscribe(
//       respuesta => {
//         if (respuesta.code == 201) {
//           alert("Libro Creado");
//           this.router.navigate(['/libros']);
//         } else {
//           alert("Ha ocurrido algún error al rellenar los campos");
//         }
//       },
//       error => {
//         if (error.status == 401) {
//           localStorage.removeItem('jwt');
//           alert("Token expirado o inválido");
//           this.router.navigate(['/login']);
//         }else{
//           alert(error.message);
//         }
//       })
//   }

//   editar() {
//     let formData: FormData = new FormData();
//     formData.append('id', this.libro.id);
//     formData.append('titulo', this.libro.titulo);
//     formData.append('precio', this.libro.precio.toString());
//     formData.append('isbn', this.libro.isbn);
//     formData.append('idAutor', this.libro.idAutor);
//     formData.append('descripcion', this.libro.descripcion);
//     if (this.archivoASubir) {
//       formData.append('archivo', this.archivoASubir, this.archivoASubir.name);
//     } else {
//       formData.append('archivo', this.libro.archivo);
//     }
//     if (this.imagenASubir) {
//       formData.append('imagen', this.imagenASubir, this.imagenASubir.name);
//     } else {
//       formData.append('imagen', this.libro.imagen);
//     }
    
//     this.servicioLibros.editarLibro(formData)
//     .subscribe(
//       respuesta => {
//         if (respuesta.code == 201) {
//           alert("Libro Modificado");
//           this.router.navigate(['/libros']);
//         } else {
//           alert("Ha ocurrido algún error al rellenar los campos");
//         }
//       },
//       error => {
//         if (error.status == 401) {
//           localStorage.removeItem('jwt');
//           alert("Token expirado o inválido");
//           this.router.navigate(['/login']);
//         }else{
//           alert(error.message);
//         }
//       })
//   }
//   cancelar() {
//     this.router.navigate(['/libros']);
//   }
//   subirImagen($event: Event) {
//     this.imagenASubir = ($event.currentTarget as HTMLInputElement).files![0];
//   }
//   subirArchivo($event: Event) {
//     this.archivoASubir = ($event.currentTarget as HTMLInputElement).files![0];
//     console.log(this.archivoASubir.name);
//   }
// }
