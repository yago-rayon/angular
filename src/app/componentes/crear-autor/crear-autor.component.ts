//Utilidades
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

//Servicios
import { AutoresService } from 'src/app/servicios/autores.service';

//Interfaces
import { Autor } from 'src/app/interfaces/autor';
@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autor.component.html',
  styleUrls: ['./crear-autor.component.scss']
})
export class CrearAutorComponent {
  titulo = "ALTA autor";
  autor: Autor = {
    "id": "",
    "nombre": "",
    "apellidos": "",
    "fechaNacimiento": "",
    "lugarNacimiento": "",
    "biografia": "",
    "foto": ""
  };
  fotoASubir: File | null = null;
  constructor(private servicioAutores: AutoresService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parametro => {
      if (parametro['id']) {
        this.titulo = "EDITAR AUTOR";
        this.servicioAutores.consultarAutor(parametro['id'])
          .subscribe(autor => this.autor = autor);
      }
    });
  }

  darAlta() {
    let formData: FormData = new FormData();
    formData.append('nombre', this.autor.nombre);
    formData.append('apellidos', this.autor.apellidos);
    formData.append('fechaNacimiento', this.autor.fechaNacimiento);
    formData.append('lugarNacimiento', this.autor.lugarNacimiento);
    formData.append('biografia', this.autor.biografia);
    if (this.fotoASubir != null) {
      formData.append('foto', this.fotoASubir, this.fotoASubir.name);
      this.router.navigate(['/autores']);

    } else {
      formData.append('foto', 'placeholder.jpg');
    }
    this.servicioAutores.altaAutor(formData)
      .subscribe(
        respuesta => {
          if (respuesta.code == 201) {
            alert("Autor Creado");
            this.router.navigate(['/autores']);
          } else {
            alert("Ha ocurrido algún error al rellenar los campos");
          }
        },
        error => {
          if (error.status == 401) {
            localStorage.removeItem('jwt');
            alert("Token expirado o inválido");
            this.router.navigate(['/login']);
          }else{
            alert(error.message);
          }
        })
      ;
  }

  editar() {
    let formData: FormData = new FormData();
    formData.append('id', this.autor.id);
    formData.append('nombre', this.autor.nombre);
    formData.append('apellidos', this.autor.apellidos);
    formData.append('fechaNacimiento', this.autor.fechaNacimiento);
    formData.append('lugarNacimiento', this.autor.lugarNacimiento);
    formData.append('biografia', this.autor.biografia);
    if (this.fotoASubir != null) {
      formData.append('foto', this.fotoASubir, this.fotoASubir.name);
    } else {
      formData.append('foto', this.autor.foto);
    }
    this.servicioAutores.editarAutor(formData)
    .subscribe(
      respuesta => {
        if (respuesta.code == 201) {
          alert("Autor Modificado");
          this.router.navigate(['/autores']);
        } else {
          alert("Ha ocurrido algún error al rellenar los campos");
        }
      },
      error => {
        if (error.status == 401) {
          localStorage.removeItem('jwt');
          alert("Token expirado o inválido");
          this.router.navigate(['/login']);
        }else{
          alert(error.message);
        }
      })
  }
  cancelar() {
    this.router.navigate(['/autores']);
  }
  subirFoto($event: Event) {
    this.fotoASubir = ($event.currentTarget as HTMLInputElement).files![0];
    console.log(this.fotoASubir);
  }
}
