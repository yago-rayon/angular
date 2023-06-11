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

@Component({
  selector: 'app-novela',
  templateUrl: './novela.component.html',
  styleUrls: ['./novela.component.scss']
})
export class NovelaComponent {
  datos: any;
  novela: any;
  autor: any;
  usuario: Usuario;
  tituloNovela: string;
  subscripcion: any;
  listaCapitulos: Array<any>;
  directorioImagenes:string;
  descripcionRecortada: string;
  constructor(private servicioNovela: NovelasService, private servicioUsuario: UsuariosService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
  this.tituloNovela = this.route.snapshot.paramMap.get('titulo') ?? '';
  this.directorioImagenes = Constantes.directorioImagenes;
  if(this.tituloNovela == ''){
    this.redirigir();
  }
  this.subscripcion = this.servicioNovela.consultarNovelaTitulo(this.tituloNovela).subscribe((data)=>{
    this.novela = (data.novela as Novela);
    this.autor = this.novela.autor;
    this.listaCapitulos = this.novela.listaCapitulos;
    if(this.novela.descripcion.length > 10){
      this.descripcionRecortada = this.novela.descripcion.slice(0,10);
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
      this.descripcionRecortada = this.novela.descripcion.slice(0,10);
    }
  }
} 
