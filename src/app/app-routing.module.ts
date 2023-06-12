import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { RegistroComponent } from './paginas/registro/registro.component';
import { LoginComponent } from './paginas/login/login.component';
import { CapituloComponent } from './paginas/capitulo/capitulo.component';
// import { CrearAutorComponent } from './componentes/crear-autor/crear-autor.component';
// import { CrearLibroComponent } from './componentes/crear-libro/crear-libro.component';
// import { TablaAutoresComponent } from './componentes/tabla-autores/tabla-autores.component';
import { AltaNovelaComponent } from './paginas/alta-novela/alta-novela.component';
import { NovelaComponent } from './paginas/novela/novela.component';
//Rutas
const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  //   {path: 'autores', component: TablaAutoresComponent},
  { path: 'novela/crear', component: AltaNovelaComponent },
  //   {path: 'crearAutor/:id', component: CrearAutorComponent},
  //   {path: 'libros', component: TablaLibrosComponent},
  //   {path: 'crearLibro', component: CrearLibroComponent},
  { path: 'novela/:_id', component: NovelaComponent },
  { path: 'novela/:_id/capitulo/:numero', component: CapituloComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
