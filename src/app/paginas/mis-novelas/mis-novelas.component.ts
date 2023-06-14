import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constantes } from 'src/app/constantes/constantes';
//Servicios
import { NovelasService } from 'src/app/servicios/novelas.service';
//Interfaces
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-mis-novelas',
  templateUrl: './mis-novelas.component.html',
  styleUrls: ['./mis-novelas.component.scss']
})
export class MisNovelasComponent {
  datos: any = {
    etiquetas: [],
    generos: [],
    pagina: 1,
    limite: 20
  };
  usuario: Usuario = null;
  _id: string;
  subscripcion: any;
  subscripcionUsuario: any;
  listaNovelas: any;
  directorioImagenes: string = Constantes.directorioImagenes;
  directorioIconos: string = Constantes.directorioIconos;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscripcionUsuario = this.servicioAuth.misDatos().subscribe((data) => {
      this.usuario = (data.usuario as Usuario);
      if (!this.usuario) {
        this.redirigir()
      }
    },
      (error) => {
        this.redirigir()
      }
    );
    this.subscripcion = this.servicioNovela.misNovelas().subscribe((data) => {
      this.listaNovelas = data.novelas;
    },
      (error) => {
        this.listaNovelas = null;
      });
  }
  ngOnDestroy() {

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
}
