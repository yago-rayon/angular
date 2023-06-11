//Modulos
import { NgModule } from '@angular/core';
import { NgbModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Servicios
import { UsuariosService } from './servicios/usuarios.service';
import { NovelasService } from './servicios/novelas.service';

//Componentes
import { AppComponent } from './app.component';

import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { NovelaComponent } from './paginas/novela/novela.component';
import { BarraBusquedaComponent } from './componentes/barra-busqueda/barra-busqueda.component';
import { TablaCapitulosComponent } from './componentes/tabla-capitulos/tabla-capitulos.component';
//Pipes
import { FechaHastaAhoraPipe } from './pipes/fecha-hasta-ahora.pipe';
import { ModalErrorComponent } from './componentes/modal-error/modal-error.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NovelaComponent,
    LoginComponent,
    BarraBusquedaComponent,
    TablaCapitulosComponent,
    FechaHastaAhoraPipe,
    ModalErrorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbCollapseModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true},
    UsuariosService,
    NovelasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
