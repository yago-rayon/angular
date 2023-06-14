//Utilidades
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constantes } from 'src/app/constantes/constantes';
//Servicios
import { NovelasService } from 'src/app/servicios/novelas.service';
import { AuthService } from 'src/app/servicios/auth.service';
//Interfaces
import { Usuario } from 'src/app/interfaces/usuario';
import { Novela } from '../../interfaces/novela';
@Component({
  selector: 'app-capitulo',
  templateUrl: './capitulo.component.html',
  styleUrls: ['./capitulo.component.scss']
})
export class CapituloComponent {
  datos: any;
  novela: any;
  autor: any;
  novelaSeguida: boolean;
  usuario: Usuario;
  _id: string;
  subscripcion: any;
  subscripcionUsuario:any;
  listaCapitulos: Array<any>;
  directorioImagenes: string = Constantes.directorioImagenes;
  numeroCapitulo: number;
  capitulo:any;
  contenidoModal:any;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('_id') ?? '';
    this.numeroCapitulo = this.route.snapshot.paramMap.get('numero') as unknown as number ?? 0;
    this.route.params.subscribe(val => {
      this._id = val['_id'];
      this.numeroCapitulo = val['numero'];
    });
    if (!this._id) {
      this.redirigir();
    }
    if (!this.numeroCapitulo || this.numeroCapitulo < 1) {
      this.redirigir();
    }
    this.subscripcionUsuario = this.servicioAuth.misDatos().subscribe((data) => {
      this.usuario = (data.usuario as Usuario);
    });
    this.subscripcion = this.servicioNovela.consultarNovela(this._id).subscribe(
      (data) => {
      this.novela = (data.novela as Novela);
      this.autor = this.novela.autor;
      this.listaCapitulos = this.novela.listaCapitulos;
      this.capitulo = this.listaCapitulos[this.numeroCapitulo-1];
      if(!this.capitulo){
        this.router.navigate(['/novela',this._id]);
      }
    },(err) => {
      if(!this.novela){
        this.redirigir();
      }
    }
    );
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
    this.router.navigate(['novelas']);
  }
  cambiarCapitulo(numero){
    this.numeroCapitulo -= numero;
    this.capitulo = this.listaCapitulos[this.numeroCapitulo-1];
    this.router.navigate(['novela',this._id, 'capitulo',this.numeroCapitulo]);
  }
  seguirNovela() {
    this.servicioNovela.seguirNovela(this._id).subscribe((data) => {
      if (data.novelaSeguida == 0) {
        this.novelaSeguida = false;
      } else {
        this.novelaSeguida = true;
      }
    });
  }
}
