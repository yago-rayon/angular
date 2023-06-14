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
  providers: [NgbCollapse],
  styleUrls: ['./listado-novelas.component.scss']
})
export class ListadoNovelasComponent {
  datos: any = {
    etiquetas: [],
    generos: [],
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
  parametroActual: any;
  paginaActual: any;
  numeroPaginas: number;
  listaPaginas: any;
  hayPaginaSiguiente: boolean = false;
  paginaSiguiente: number = null;
  hayPaginaAnterior: boolean = false;
  paginaAnterior: number = null;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute, private colapsable: NgbCollapse) { }

  ngOnInit() {
    this.subscripcionParametros = this.route.queryParams.subscribe(params => {
      this.tituloNovela = params['titulo'];
      this.genero = params['genero'];
      this.etiqueta = params['etiqueta'];
      this.paginaActual = params['pagina'] || 1;
      if (this.tituloNovela) {
        this.buscarPorTitulo();
      }
      else if (this.genero) {
        this.buscarPorGenero();
      } else if (this.etiqueta) {
        this.buscarPorEtiqueta();
      }
    });
    this.subscripcionUsuario = this.servicioAuth.misDatos().subscribe((data) => {
      this.usuario = (data.usuario as Usuario);
    });
  }

  buscarPorTitulo() {
    this.subscripcion = this.servicioNovela.consultarNovelasTitulo(this.tituloNovela, this.paginaActual).subscribe((data) => {
      this.listaNovelas = data.novelas.docs;
      this.parametroActual = this.tituloNovela;
      this.hayPaginaAnterior = data.novelas.hasNextPage;
      this.paginaAnterior = data.novelas.prevPage;
      this.hayPaginaSiguiente = data.novelas.hasPrevPage;
      this.paginaSiguiente = data.novelas.nextPage;
      this.numeroPaginas = data.novelas.totalPages;
      this.listaPaginas = Array.from({length:this.numeroPaginas},(valor,indice)=>indice+1);
    },
      (error) => {
        this.listaNovelas = null;
      });
  }

buscarPorGenero(){
  this.subscripcion = this.servicioNovela.consultarNovelasGenero(this.genero, this.paginaActual).subscribe((data) => {
      this.listaNovelas = data.novelas.docs;
      this.parametroActual = this.genero;
      this.hayPaginaAnterior = data.novelas.hasNextPage;
      this.paginaAnterior = data.novelas.prevPage;
      this.hayPaginaSiguiente = data.novelas.hasPrevPage;
      this.paginaSiguiente = data.novelas.nextPage;
      this.numeroPaginas = data.novelas.totalPages;
      this.listaPaginas = Array.from({length:this.numeroPaginas},(valor,indice)=>indice+1);
  },
    (error) => {
      this.listaNovelas = null;
    });
}

buscarPorEtiqueta(){
  this.subscripcion = this.servicioNovela.consultarNovelasEtiqueta(this.etiqueta, this.paginaActual).subscribe((data) => {
    this.listaNovelas = data.novelas.docs;
    this.parametroActual = this.etiqueta;
      this.hayPaginaAnterior = data.novelas.hasNextPage;
      this.paginaAnterior = data.novelas.prevPage;
      this.hayPaginaSiguiente = data.novelas.hasPrevPage;
      this.paginaSiguiente = data.novelas.nextPage;
      this.numeroPaginas = data.novelas.totalPages;
      this.listaPaginas = Array.from({length:this.numeroPaginas},(valor,indice)=>indice+1);
  },
    (error) => {
      this.listaNovelas = null;
    });
    
}

ngOnDestroy() {
  if (this.subscripcionParametros) {
    this.subscripcionParametros.unsubscribe();
  }
  if (this.subscripcion) {
    this.subscripcion.unsubscribe();
  }
  if (this.subscripcionUsuario) {
    this.subscripcionUsuario.unsubscribe();
  }
}
redirigir() {
  this.router.navigate(['inicio']);
}
mostrarBuscador(){
  this.colapsable.animation(true);
}
}
