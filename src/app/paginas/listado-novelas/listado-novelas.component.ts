import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constantes } from 'src/app/constantes/constantes';
//Servicios
import { NovelasService } from 'src/app/servicios/novelas.service';
//Interfaces
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-listado-novelas',
  templateUrl: './listado-novelas.component.html',
  providers: [ NgbCollapse ],
  styleUrls: ['./listado-novelas.component.scss']
})
export class ListadoNovelasComponent {
  datos: any = {
    etiquetas : [],
    generos : [],
    pagina: 1,
    limite: 20
  };
  autor: any;
  usuario: Usuario = null;
  _id: string;
  tituloNovela: string = null;
  genero: string = null;
  etiqueta: string = null;
  subscripcion: any;
  subscripcionUsuario: any;
  subscripcionParametros: any;
  listaNovelas: any;
  listaGeneros = Constantes.listaGeneros;
  listaEtiquetas = Constantes.listaEtiquetas;
  directorioImagenes: string = Constantes.directorioImagenes;
  directorioIconos: string = Constantes.directorioIconos;
  descripcionRecortada: string = null;
  buscadorColapsado: boolean = true;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute, private colapsable: NgbCollapse) { }

  ngOnInit() {
    this.subscripcionParametros = this.route.queryParams.subscribe(params => {
      this.tituloNovela = params['titulo'];
      this.genero = params['genero'];
      this.etiqueta = params['etiqueta'];
      if (this.tituloNovela) {
        this.subscripcion = this.servicioNovela.consultarNovelasTitulo(this.tituloNovela).subscribe((data) => {
          this.listaNovelas = data.docs;
        },
        (error)=>{
          this.listaNovelas = null;
        });
      }else if(this.genero){
        this.subscripcion = this.servicioNovela.consultarNovelasGenero(this.genero).subscribe((data) => {
          this.listaNovelas = data.docs;
        },
        (error)=>{
          this.listaNovelas = null;
        });
      }else if(this.etiqueta){
        this.subscripcion = this.servicioNovela.consultarNovelasEtiqueta(this.etiqueta).subscribe((data) => {
          this.listaNovelas = data.docs;
        },
        (error)=>{
          this.listaNovelas = null;
        });
        }
      });
    this.subscripcionUsuario = this.servicioAuth.misDatos().subscribe((data) => {
      this.usuario = (data.usuario as Usuario);
    });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
    this.subscripcionParametros.unsubscribe();
    this.subscripcionUsuario.unsubscribe();
  }
  redirigir() {
    this.router.navigate(['inicio']);
  }
  mostrarBuscador(){
    this.colapsable.animation(true);
  }
}
