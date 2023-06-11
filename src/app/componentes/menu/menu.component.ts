import { Component, OnInit } from '@angular/core';
import { NovelasService } from 'src/app/servicios/novelas.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  name = 'Angular';
  public isCollapsed = true;
  tituloABuscar : string;
  logueado : boolean = false;
  constructor(servicioNovela : NovelasService){}
  ngOnInit(){
    this.comprobarLogin();
    let intervalo =setInterval(this.comprobarLogin, 15000);
  }
  comprobarLogin(){
    if (localStorage.getItem('jwt')){
      this.logueado=true;
    }
  }
  buscarNovela(tituloABuscar){
    console.log(tituloABuscar)
  }
}
