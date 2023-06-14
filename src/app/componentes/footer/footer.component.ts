import { Component } from '@angular/core';
import { Constantes } from 'src/app/constantes/constantes';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  directorioImagenes = Constantes.directorioImagenes;
  directorioIconos = Constantes.directorioIconos;
}
