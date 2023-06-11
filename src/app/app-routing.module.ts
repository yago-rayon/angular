import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
// import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
// import { CrearAutorComponent } from './componentes/crear-autor/crear-autor.component';
// import { CrearLibroComponent } from './componentes/crear-libro/crear-libro.component';
// import { TablaAutoresComponent } from './componentes/tabla-autores/tabla-autores.component';
// import { TablaLibrosComponent } from './componentes/tabla-libros/tabla-libros.component';
import { NovelaComponent } from './paginas/novela/novela.component';
//Rutas
const routes: Routes = [
//   {path: 'registro', component: RegistroComponent},
//   {path: 'autores', component: TablaAutoresComponent},
//   {path: 'crearAutor', component: CrearAutorComponent},
//   {path: 'crearAutor/:id', component: CrearAutorComponent},
//   {path: 'libros', component: TablaLibrosComponent},
//   {path: 'crearLibro', component: CrearLibroComponent},
  {path: 'novela/:titulo', component: NovelaComponent},
  {path: 'login', component: LoginComponent},
// {path: '', redirectTo:'novela/:titulo',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
