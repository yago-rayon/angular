import { Component} from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
//Servicios
import { AutoresService } from 'src/app/servicios/autores.service';
//Interfaces
import { Autor } from '../../interfaces/autor';



@Component({
  selector: 'app-tabla-autores',
  templateUrl: './tabla-autores.component.html',
  styleUrls: ['./tabla-autores.component.scss']
})
export class TablaAutoresComponent {
  autores: Autor[]=[];

  constructor(private servicioAutores:AutoresService,private router: Router){}

  ngOnInit(){
    this.consultarAutores();
  }
  consultarAutores(){
    this.servicioAutores.consultarTodosAutores()
                       .subscribe( datos => {this.autores = datos;});
  }
  borrar(autor:Autor){
    this.servicioAutores.borrarAutor(autor)
                       .subscribe (respuesta=>{
                        if (respuesta.status=="borrado"){
                          alert("autor borrado");
                          this.consultarAutores();
                        } else {
                          alert("No se ha podido borrar el autor. Error:"+respuesta.status);
                        }
                       });
  }
  editar(autor:Autor){
    this.router.navigate(['/editarAutor/'+autor.id]);
  }
}
