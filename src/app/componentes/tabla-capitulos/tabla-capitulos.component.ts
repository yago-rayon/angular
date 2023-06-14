//Utilidades
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FechaHastaAhoraPipe } from 'src/app/pipes/fecha-hasta-ahora.pipe';
import { Usuario } from 'src/app/interfaces/usuario';
import { Constantes } from 'src/app/constantes/constantes';
import { NovelasService } from 'src/app/servicios/novelas.service';
@Component({
  selector: 'app-tabla-capitulos',
  templateUrl: './tabla-capitulos.component.html',
  styleUrls: ['./tabla-capitulos.component.scss']
})
export class TablaCapitulosComponent {
  @Input() listaCapitulos: Array<any>;
  @Input() _idNovela: string;
  @Input() esAutor : boolean;
  directorioIconos: string = Constantes.directorioIconos;
  listaFiltrada: Array<any>;
  listaPaginada: Array<any>;
  paginaActual: number = 1;
  numeroPaginas: number;
  listaPaginas: Array<number> = [];
  ordenLista: number = 1;
  constructor(private router: Router, private route: ActivatedRoute, private servicioNovela: NovelasService) { }
  ngOnInit() {
    this.filtrarLista(this.ordenLista);
    this.listaPaginada = this.listaCapitulos?.slice(0, 19);
    this.numeroPaginas = Math.floor(this.listaCapitulos?.length / 20);
    if (this.numeroPaginas < 1) { this.numeroPaginas = 1 }
    if (this.listaCapitulos?.length % 2 != 0) { this.numeroPaginas++ }
    for (let i = 1; i <= this.numeroPaginas; i++) {
      this.listaPaginas?.push(i);
    }
    if (!this.listaPaginas) { this.listaPaginas = [1] }
  }
  redirigirCapitulo(numero) {
    this.router.navigate(['novela', this._idNovela,'capitulo',numero])
  }
  editarCapitulo(numero) {
    this.router.navigate(['novela', this._idNovela,'editarCapitulo',numero])
  }
  borrarCapitulo(numero) {
    this.servicioNovela.borrarCapitulo(this._idNovela, numero)
      .subscribe(
        (respuesta) => {
          this.listaCapitulos.splice(numero-1,1);
          this.filtrarLista(1);
        },
        (error) => {
          if (error.status == 401) {
            localStorage.removeItem('jwt');
            alert("Token expirado o inválido");
            this.router.navigate(['/login']);
          } else {
            alert(error.error.error);
          }
        })
  }
  paginarLista(pagina: number) {
    this.paginaActual = pagina;
    this.listaPaginada = this.listaFiltrada.slice((Math.floor((pagina - 1) * 20)), (Math.floor((pagina * 20) - 1)));
  }
  filtrarLista(orden) {
    if (orden == 1) {
      this.listaFiltrada = this.listaCapitulos.sort((a, b) => {
        return new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime()
      });
      this.ordenLista = -1;
    } else {
      this.listaFiltrada = this.listaCapitulos.sort((a, b) => {
        return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
      });
      this.ordenLista = 1;
    }
    this.paginarLista(this.paginaActual);
  }
}
