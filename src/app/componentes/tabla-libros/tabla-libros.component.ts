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
      .subscribe(respuesta => {
        if (respuesta.status == "borrado") {
          alert("libro borrado");
          this.consultarLibros();
        } else {
          alert("No se ha podido borrar el libro. Error:" + respuesta.status);
        }
      });
  }
  editar(libro: Libro) {
    this.router.navigate(['/editarLibro/' + libro.id]);
  }
}
