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
  selector: 'app-alta-capitulo',
  templateUrl: './alta-capitulo.component.html',
  styleUrls: ['./alta-capitulo.component.scss']
})
export class AltaCapituloComponent {
  public Editor = ClassicEditor;
  capitulo: any = {
    titulo: '',
    contenido: ''
  }
  errorCampos: any= false;
  datos: any;
  novela: Novela;
  autor: any;
  usuario: Usuario;
  subscripcion: any;
  subscripcionUsuario: any;
  _id: string;
  numeroCapitulo: number = null;
  directorioImagenes: string;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(val => {
      this._id = val['_id'];
      this.numeroCapitulo = val['numero'];
    });
    this._id = this.route.snapshot.paramMap.get('_id') ?? '';
    this.numeroCapitulo = this.route.snapshot.paramMap.get('numero') as unknown as number;
    this.directorioImagenes = Constantes.directorioImagenes;

    if (!this._id) {
      this.router.navigate(['inicio']);
    }
    //Comprobación de usuario logueado
    this.subscripcionUsuario = this.servicioAuth.misDatos().subscribe(data => {
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
          this.router.navigate(['login']);
        }
      });
    if (this._id) {
      this.subscripcion = this.servicioNovela.consultarNovela(this._id).subscribe((data) => {
        this.novela = (data.novela as Novela);
        this.autor = this.novela.autor;
        if (this.autor.autor_id != this.usuario._id) {
          alert('No es el autor de la novela');
          this.router.navigate(['inicio']);
        }
        if(this.numeroCapitulo){
          if (this.novela.listaCapitulos[this.numeroCapitulo - 1]) {
            this.capitulo.titulo = (this.novela.listaCapitulos[this.numeroCapitulo - 1] as any).titulo;
            this.capitulo.contenido = (this.novela.listaCapitulos[this.numeroCapitulo - 1] as any).contenido;
          }else{
            this.router.navigate(['/novela',this._id]);
          }
        }
      },
      (error)=>{
        this.router.navigate(['novelas']);
      }
      );
    }
  }

  ngOnDestroy() {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
    if (this.subscripcionUsuario) {
      this.subscripcionUsuario.unsubscribe();
    }

  }
  redirigir() {
    this.router.navigate(['index']);
  }
  editarCapitulo() {
    this.servicioNovela.editarCapitulo(this.capitulo.titulo, this.capitulo.contenido, this._id, this.numeroCapitulo)
      .subscribe(
        (respuesta) => {
          this.router.navigate(['/novela', this._id,'capitulo',this.numeroCapitulo]);
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
  enviarCapitulo() {
    this.servicioNovela.altaCapitulo(this.capitulo.titulo, this.capitulo.contenido, this._id)
      .subscribe(
        (respuesta) => {
          this.router.navigate(['/novela/', this._id]);
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
}
