//Utilidades
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constantes } from 'src/app/constantes/constantes';
//Servicios
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
  esAutor:boolean = false;
  novelaSeguida: boolean;
  usuario: Usuario = null;
  _id: string;
  subscripcion: any;
  listaCapitulos: Array<any>;
  directorioImagenes:string = Constantes.directorioImagenes;
  directorioIconos:string = Constantes.directorioIconos;
  descripcionRecortada: string = null;
  constructor(private servicioNovela: NovelasService, private servicioAuth: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
  this._id = this.route.snapshot.paramMap.get('_id') ?? '';
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
    if(!this.novela){
      this.router.navigate(['novelas']);
    }
    this.autor = this.novela.autor;
    this.listaCapitulos = this.novela.listaCapitulos;
    if(this.novela.descripcion.length > 200){
      this.descripcionRecortada = this.novela.descripcion.slice(0,200);
    }
    if(this.usuario && this.usuario._id == this.autor.autor_id){
      this.esAutor = true;
    }
  },
  (error)=>{
    this.router.navigate(['novelas']);
  }
  );
  }

  ngOnDestroy(){
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }
  redirigir(){
    this.router.navigate(['novelas']);
  }
  borrarNovela(){
    this.servicioNovela.borrarNovela(this._id).subscribe((data)=>{
      this.redirigir();
    },
    (error)=>{
      alert('Error al borrar la novela '+ error.error.error);
    }
    );
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
