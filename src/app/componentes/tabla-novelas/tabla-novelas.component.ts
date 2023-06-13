import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FechaHastaAhoraPipe } from 'src/app/pipes/fecha-hasta-ahora.pipe';
import { Constantes } from 'src/app/constantes/constantes';
import { NovelasService } from 'src/app/servicios/novelas.service';

@Component({
  selector: 'app-tabla-novelas',
  templateUrl: './tabla-novelas.component.html',
  styleUrls: ['./tabla-novelas.component.scss']
})
export class TablaNovelasComponent {
  @Input() listaNovelas: Array<any>;
  directorioIconos: string = Constantes.directorioIconos;
  directorioImagenes: string = Constantes.directorioImagenes;
  listaFiltrada: Array<any>;
  ordenLista: number = 1;
  constructor(private router: Router, private route: ActivatedRoute, private servicioNovela: NovelasService) { }
  ngOnInit() {
    this.filtrarLista(this.ordenLista);
  }

  filtrarLista(orden) {
    if (orden == 1) {
      this.listaFiltrada = this.listaNovelas.sort((a, b) => {
        return new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime()
      });
      this.ordenLista = -1;
    } else {
      this.listaFiltrada = this.listaNovelas.sort((a, b) => {
        return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
      });
      this.ordenLista = 1;
    }
  }
}
