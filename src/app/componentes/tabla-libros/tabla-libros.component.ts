import { Component } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
//Servicios
import { LibrosService } from 'src/app/servicios/libros.service';
//Interfaces
import { Libro } from '../../interfaces/libro';


@Component({
  selector: 'app-tabla-libros',
  templateUrl: './tabla-libros.component.html',
  styleUrls: ['./tabla-libros.component.scss']
})
export class TablaLibrosComponent {
  libros: Libro[] = [];

  constructor(private servicioLibros: LibrosService,
    private router: Router) { }

  ngOnInit() {
    this.consultarLibros();

  }

  consultarLibros() {
    this.servicioLibros.consultarTodosLibros()
      .subscribe(datos => { this.libros = datos; });
  }
  borrar(libro: Libro) {
    this.servicioLibros.borrarLibro(libro)
      .subscribe(
        respuesta => {
          if (respuesta.code == 201) {
            alert("Autor Borrado");
            this.ngOnInit;
            // this.router.navigate(['/autores']);
          } else {
            alert("Ha ocurrido algún error al rellenar los campos");
          }
        },
        error => {
          if (error.status == 401) {
            localStorage.removeItem('jwt');
            alert("Token expirado o inválido");
            this.router.navigate(['/login']);
          } else {
            alert(error.message);
          }
        });
  }
  editar(libro: Libro) {
    this.router.navigate(['/editarLibro/' + libro.id]);
  }
}
