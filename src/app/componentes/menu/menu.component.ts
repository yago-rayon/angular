import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Constantes } from 'src/app/constantes/constantes';
import { Usuario } from 'src/app/interfaces/usuario';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() usuario: Usuario;
  public isCollapsed = true;
  tituloABuscar : string;
  logueado : boolean = false;
  directorioImagenes = Constantes.directorioImagenes;
  constructor( private router: Router){}
  ngOnInit(){
    if(this.usuario){
      this.logueado = true;
    }
  }
  buscarNovela(){
    this.router.navigate(['/novelas'],{ queryParams: { titulo: this.tituloABuscar}});
  }
  cerrarSesion(){
    localStorage.removeItem('jwt');
    window.location.reload();
  }
}
