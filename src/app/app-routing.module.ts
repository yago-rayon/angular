import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearAutorComponent } from './componentes/crear-autor/crear-autor.component';
import { TablaAutoresComponent } from './componentes/tabla-autores/tabla-autores.component';
import { LoginComponent } from './componentes/login/login.component';

//Rutas
const routes: Routes = [
  {path: 'registro', component: RegistroComponent},
  {path: 'autores', component: TablaAutoresComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
