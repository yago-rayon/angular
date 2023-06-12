//Utilidades
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Constantes } from 'src/app/constantes/constantes';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//Servicios
import { NovelasService } from 'src/app/servicios/novelas.service';
import { AuthService } from 'src/app/servicios/auth.service';
//Interfaces
import { Usuario } from 'src/app/interfaces/usuario';
import { Novela } from '../../interfaces/novela';

@Component({
  selector: 'app-alta-novela',
  templateUrl: './alta-novela.component.html',
  styleUrls: ['./alta-novela.component.scss']
})
export class AltaNovelaComponent {
  public Editor = ClassicEditor;
  datos: any;
  novela: Novela = {
    _id: '',
    autor: {},
    titulo: '',
    descripcion: '',
    generos: [],
    etiquetas: [],
    fechaCreacion: null,
    fechaUltimoCapitulo: null,
    numeroCapitulos: null,
    visitas: null,
    listaCapitulos: [],
    puntuacion: null,
    imagen: 'placeholder.jpg'
  };
  autor: any;
  usuario: Usuario;
  subscripcion: any;
  _id: string;
  directorioImagenes: string;
  listaGeneros = Constantes.listaGeneros;
  listaEtiquetas = Constantes.listaEtiquetas;
  imagenASubir: File | null = null;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this._id = this.route.snapshot.paramMap.get('_id') ?? '';
    this.directorioImagenes = Constantes.directorioImagenes;
    //Comprobación de usuario logueado
    this.servicioAuth.misDatos().subscribe(data => {
      this.usuario = (data.usuario as Usuario);
      if (!this.usuario) {
        this.router.navigate(['login']);
      }
    },
      error => {
        if (error.status == 401) {
          localStorage.removeItem('jwt');
          alert("Token expirado o inválido");
          this.router.navigate(['login']);
        } else {
          alert(error.error);
        }
      });
    if (this._id) {
      this.subscripcion = this.servicioNovela.consultarNovela(this._id).subscribe((data) => {
        this.novela = (data.novela as Novela);
        this.autor = this.novela.autor;
      });
    }

  }

  ngOnDestroy() {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }

  }
  redirigir() {
    this.router.navigate(['index']);
  }
  maxGeneros($event){
    console.log(this.novela.generos);
    let numeroGeneros = 0;
    for(const genero in this.novela.generos){
      if(this.novela.generos[genero]){
        numeroGeneros++;
      }
    }
      if(numeroGeneros > 4){
        (<HTMLInputElement>event.target).checked = false;
        (<HTMLInputElement>event.target).dispatchEvent(new Event('change'))
      }
  }
  maxEtiquetas(){
    let numeroEtiquetas = 0;
    for(const etiqueta in this.novela.etiquetas){
      if(this.novela.etiquetas[etiqueta]){
        numeroEtiquetas++;
      }
    }
      if(numeroEtiquetas > 8){
        (<HTMLInputElement>event.target).checked = false;
        (<HTMLInputElement>event.target).dispatchEvent(new Event('change'))
      }
  }
  enviarNovela(){
    let listaEtiquetas: Array<any>=[];
    for(const etiqueta in this.novela.etiquetas){
      if(this.novela.etiquetas[etiqueta]){
        listaEtiquetas.push(etiqueta);
      }
    }
    console.log(listaEtiquetas);
    this.servicioNovela.altaNovela(this.novela,this.imagenASubir)
    .subscribe(
      respuesta => {
        if (respuesta.code == 201) {
          this.router.navigate(['/novela']);
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

  subirImagen($event){
    this.imagenASubir = ($event.currentTarget as HTMLInputElement).files![0];
  }
}
