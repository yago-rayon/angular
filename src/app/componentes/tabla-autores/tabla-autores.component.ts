import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DecimalPipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
//Servicios
import { AutoresService } from 'src/app/servicios/autores.service';
//Interfaces
import { Autor } from '../../interfaces/autor';


export type SortColumn = keyof Autor | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}


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
                       .subscribe( datos => {this.autores = datos; console.log(this.autores)});
  }
  borrar(autor:Autor){
    this.servicioAutores.borrarAutor(autor)
                       .subscribe (respuesta=>{
                        if (respuesta.status=="success"){
                          alert("autor borrado");
                          this.consultarAutores();
                        } else {
                          alert("No se ha podido borrar el autor");
                        }
                       });
  }
  editar(autor:Autor){
    this.router.navigate(['/editarAutor/'+autor.id]);
  }
}
