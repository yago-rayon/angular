//Utilidades
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe, NgFor } from '@angular/common';
import { OnInit } from '@angular/core';
import { Constantes } from 'src/app/constantes/constantes';
//Servicios
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NovelasService } from 'src/app/servicios/novelas.service';
//Interfaces
import { Usuario } from 'src/app/interfaces/usuario';
import { Novela } from '../../interfaces/novela';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-novela',
  templateUrl: './novela.component.html',
  styleUrls: ['./novela.component.scss']
})
export class NovelaComponent {
  datos: any;
  novela: any;
  autor: any;
  novelaSeguida: boolean;
  usuario: Usuario;
  _id: string;
  subscripcion: any;
  listaCapitulos: Array<any>;
  directorioImagenes:string;
  descripcionRecortada: string;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
  this._id = this.route.snapshot.paramMap.get('_id') ?? '';
  this.directorioImagenes = Constantes.directorioImagenes;
  if(this._id == ''){
    this.redirigir();
  }
  
  this.servicioAuth.misDatos().subscribe((data)=>{
    this.usuario = (data.usuario as Usuario);
    if (this.usuario){
      this.novelaSeguida = false;
      if (this.usuario.novelasSeguidas.length > 0){
        if(this.usuario.novelasSeguidas.includes(this._id)){
          this.novelaSeguida = true;
        }
      }
    }
  });
  this.subscripcion = this.servicioNovela.consultarNovela(this._id).subscribe((data)=>{
    this.novela = (data.novela as Novela);
    this.autor = this.novela.autor;
    this.listaCapitulos = this.novela.listaCapitulos;
    if(this.novela.descripcion.length > 200){
      this.descripcionRecortada = this.novela.descripcion.slice(0,200);
      console.log(this.novela.descripcion);
    }
  });

  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }
  redirigir(){
    this.router.navigate(['index']);
  }
  mostrarDescripcion(){
    if(this.descripcionRecortada){
      this.descripcionRecortada = null;
    }else{
      this.descripcionRecortada = this.novela.descripcion.slice(0,200);
    }
  }
  seguirNovela(){
      this.servicioNovela.seguirNovela(this._id).subscribe((data)=>{
        if(data.novelaSeguida == 0){
          this.novelaSeguida = false;
        }else{
          this.novelaSeguida = true;
        }
      });
    }
} 
