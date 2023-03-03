import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  name = 'Angular';
  public isCollapsed = true;
  
  logueado : boolean = false;
  ngOnInit(){
    this.comprobarLogin();
    let intervalo =setInterval(this.comprobarLogin, 15000);
  }
  comprobarLogin(){
    if (localStorage.getItem('jwt')){
      this.logueado=true;
    }
  }
}
