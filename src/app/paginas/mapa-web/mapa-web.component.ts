import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constantes } from 'src/app/constantes/constantes';
//Servicios
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';
@Component({
  selector: 'app-mapa-web',
  templateUrl: './mapa-web.component.html',
  styleUrls: ['./mapa-web.component.scss']
})
export class MapaWebComponent {
  directorioImagenes = Constantes.directorioImagenes;
  subscripcionUsuario: any;
  usuario: Usuario;
  constructor(private http: HttpClient, private servicioAuth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.subscripcionUsuario = this.servicioAuth.misDatos().subscribe(
      (data) => {
      if (data.usuario) {
        this.usuario = data.usuario;
      }
    },
    (error)=>{
      this.usuario = null;
    }
    );
  }

  ngOnDestroy() {
    if (this.subscripcionUsuario) {
      this.subscripcionUsuario.unsubscribe();
    }
  }
}
