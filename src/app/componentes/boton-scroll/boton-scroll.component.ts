import { Component } from '@angular/core';
import { Constantes } from 'src/app/constantes/constantes';
@Component({
  selector: 'app-boton-scroll',
  templateUrl: './boton-scroll.component.html',
  styleUrls: ['./boton-scroll.component.scss']
})
export class BotonScrollComponent {
  ventanaScroll = false;
  directorioIconos = Constantes.directorioIconos;
  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.ventanaScroll = window.scrollY !== 0;
    });
  }
  aLaCima(): void {
    window.scrollTo(0, 0);
  }
}
