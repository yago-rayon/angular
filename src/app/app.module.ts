//Modulos
import { NgModule } from '@angular/core';
import { NgbModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular'
//Pipes
import { FechaHastaAhoraPipe } from './pipes/fecha-hasta-ahora.pipe';

//Servicios
import { UsuariosService } from './servicios/usuarios.service';
import { NovelasService } from './servicios/novelas.service';

//Componentes
import { AppComponent } from './app.component';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { LoginComponent } from './paginas/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { NovelaComponent } from './paginas/novela/novela.component';
import { BarraBusquedaComponent } from './componentes/barra-busqueda/barra-busqueda.component';
import { TablaCapitulosComponent } from './componentes/tabla-capitulos/tabla-capitulos.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { ModalErrorComponent } from './componentes/modal-error/modal-error.component';
import { AltaNovelaComponent } from './paginas/alta-novela/alta-novela.component';
import { CapituloComponent } from './paginas/capitulo/capitulo.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NovelaComponent,
    LoginComponent,
    BarraBusquedaComponent,
    TablaCapitulosComponent,
    FechaHastaAhoraPipe,
    ModalErrorComponent,
    AltaNovelaComponent,
    RegistroComponent,
    CapituloComponent
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
    CKEditorModule,
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
