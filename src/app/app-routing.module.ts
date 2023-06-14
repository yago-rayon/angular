import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { RegistroComponent } from './paginas/registro/registro.component';
import { LoginComponent } from './paginas/login/login.component';
import { CapituloComponent } from './paginas/capitulo/capitulo.component';
import { AltaNovelaComponent } from './paginas/alta-novela/alta-novela.component';
import { NovelaComponent } from './paginas/novela/novela.component';
import { AltaCapituloComponent } from './paginas/alta-capitulo/alta-capitulo.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ListadoNovelasComponent } from './paginas/listado-novelas/listado-novelas.component';
import { MisNovelasComponent } from './paginas/mis-novelas/mis-novelas.component';
import { MisSeguidasComponent } from './paginas/mis-seguidas/mis-seguidas.component';
import { MapaWebComponent } from './paginas/mapa-web/mapa-web.component';
//Rutas
const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'novela/crear', component: AltaNovelaComponent },
  { path: 'novela/editar/:_id', component: AltaNovelaComponent },
  { path: 'novelas', component: ListadoNovelasComponent },
  { path: 'novelas/misNovelas', component: MisNovelasComponent },
  { path: 'novelas/misSeguidas', component: MisSeguidasComponent },
  { path: 'novela/:_id', component: NovelaComponent },
  { path: 'novela/:_id/capitulo/:numero', component: CapituloComponent },
  { path: 'novela/:_id/crearCapitulo', component: AltaCapituloComponent },
  { path: 'novela/:_id/editarCapitulo/:numero', component: AltaCapituloComponent },
  { path: 'mapaWeb', component: MapaWebComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
