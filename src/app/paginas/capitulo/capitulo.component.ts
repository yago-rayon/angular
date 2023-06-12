//Utilidades
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Constantes } from 'src/app/constantes/constantes';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  listaCapitulos: Array<any>;
  directorioImagenes: string= Constantes.directorioImagenes;
  descripcionRecortada: string;
  numeroCapitulo: number;
  capitulo:any;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('_id') ?? '';
    this.numeroCapitulo = this.route.snapshot.paramMap.get('numero') as unknown as number ?? 0;
    this.route.params.subscribe(val => {
      this._id = this.route.snapshot.params['_id'];
      this.numeroCapitulo = this.route.snapshot.params['numero'];
    });

    console.log(this.numeroCapitulo);
    if (!this._id) {
      this.redirigir();
    }
    if (!this.numeroCapitulo || this.numeroCapitulo < 1) {
      this.redirigir();
    }
    this.servicioAuth.misDatos().subscribe((data) => {
      this.usuario = (data.usuario as Usuario);
    });
    this.subscripcion = this.servicioNovela.consultarNovela(this._id).subscribe((data) => {
      this.novela = (data.novela as Novela);
      this.autor = this.novela.autor;
      this.listaCapitulos = this.novela.listaCapitulos;
      this.capitulo = this.listaCapitulos[this.numeroCapitulo-1];
    });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }
  redirigir() {
    this.router.navigate(['inicio']);
  }
  cambiarCapitulo(numero){
    this.numeroCapitulo -= numero;
    this.capitulo = this.listaCapitulos[this.numeroCapitulo-1];
    this.router.navigate(['novela',this._id, 'capitulo',this.numeroCapitulo]);
  }
  mostrarDescripcion() {
    if (this.descripcionRecortada) {
      this.descripcionRecortada = null;
    } else {
      this.descripcionRecortada = this.novela.descripcion.slice(0, 200);
    }
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
