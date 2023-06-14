//Utilidades
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  errorCampos :boolean= false;
  autor: any;
  usuario: Usuario;
  subscripcion: any;
  _id: string = null;
  directorioImagenes: string;
  listaGeneros = Constantes.listaGeneros;
  listaEtiquetas = Constantes.listaEtiquetas;
  imagenASubir: File | null = null;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this._id = this.route.snapshot.paramMap.get('_id');
    this.directorioImagenes = Constantes.directorioImagenes;
    //Comprobación de usuario logueado
    this.servicioAuth.misDatos().subscribe(data => {
      this.usuario = (data.usuario as Usuario);
      if (!this.usuario) {
        this.router.navigate(['login']);
      }
    },
      (error) => {
        if (error.status == 401) {
          localStorage.removeItem('jwt');
          alert("Token expirado o inválido");
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    if (this._id) {
      this.subscripcion = this.servicioNovela.consultarNovela(this._id).subscribe((data) => {
        this.novela = (data.novela as Novela);
        this.autor = this.novela.autor;
        this.novela.generos = [];
        data.novela.generos.forEach((genero) => {
          this.novela.generos[genero] = true;
        })
        this.novela.etiquetas = [];
        data.novela.etiquetas.forEach((etiqueta) => {
          this.novela.etiquetas[etiqueta] = true;
        })
      },
      (error) => {
        if (error.status == 401) {
          localStorage.removeItem('jwt');
          alert("Token expirado o inválido");
          this.router.navigate(['login']);
        } else {
        }
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
  maxGeneros($event) {
    let numeroGeneros = 0;
    for (const genero in this.novela.generos) {
      if (this.novela.generos[genero]) {
        numeroGeneros++;
      }
    }
    if (numeroGeneros > 4) {
      (<HTMLInputElement>event.target).checked = false;
      (<HTMLInputElement>event.target).dispatchEvent(new Event('change'))
    }
  }
  maxEtiquetas() {
    let numeroEtiquetas = 0;
    for (const etiqueta in this.novela.etiquetas) {
      if (this.novela.etiquetas[etiqueta]) {
        numeroEtiquetas++;
      }
    }
    if (numeroEtiquetas > 8) {
      (<HTMLInputElement>event.target).checked = false;
      (<HTMLInputElement>event.target).dispatchEvent(new Event('change'))
    }
  }
  enviarNovela() {
    this.servicioNovela.altaNovela(this.novela, this.imagenASubir)
      .subscribe(
        (respuesta) => {
          if (!respuesta.error) {
            this.router.navigate(['/novela', respuesta._id]);
          } else {
            alert("Ha ocurrido algún error al rellenar los campos");
          }
        },
        (error)=> {
          if (error.status == 401) {
            localStorage.removeItem('jwt');
            alert("Token expirado o inválido");
            this.router.navigate(['/login']);
          } else {
            this.errorCampos = true;
          }
        })
  }
  modificarNovela() {
    this.servicioNovela.editarNovela(this.novela, this.imagenASubir)
      .subscribe(
        (respuesta) => {
          if (!respuesta.error) {
            this.router.navigate(['/novela', this._id]);
          } else {
            this.errorCampos = true;
          }
        },
        (error) => {
          if (error.status == 401) {
            localStorage.removeItem('jwt');
            alert("Token expirado o inválido");
            this.router.navigate(['/login']);
          } else {
            this.errorCampos = true;
          }
        })
  }

  subirImagen($event) {
    this.imagenASubir = ($event.currentTarget as HTMLInputElement).files![0];
  }
}
