//Modulos
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs,'es');
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
import { TablaCapitulosComponent } from './componentes/tabla-capitulos/tabla-capitulos.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { AltaNovelaComponent } from './paginas/alta-novela/alta-novela.component';
import { CapituloComponent } from './paginas/capitulo/capitulo.component';
import { AltaCapituloComponent } from './paginas/alta-capitulo/alta-capitulo.component';
import { BotonScrollComponent } from './componentes/boton-scroll/boton-scroll.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ListadoNovelasComponent } from './paginas/listado-novelas/listado-novelas.component';
import { TablaNovelasComponent } from './componentes/tabla-novelas/tabla-novelas.component';
import { AuthService } from './servicios/auth.service';
import { MisSeguidasComponent } from './paginas/mis-seguidas/mis-seguidas.component';
import { MisNovelasComponent } from './paginas/mis-novelas/mis-novelas.component';
import { MapaWebComponent } from './paginas/mapa-web/mapa-web.component';
import { FooterComponent } from './componentes/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NovelaComponent,
    LoginComponent,
    TablaCapitulosComponent,
    FechaHastaAhoraPipe,
    AltaNovelaComponent,
    RegistroComponent,
    CapituloComponent,
    AltaCapituloComponent,
    BotonScrollComponent,
    InicioComponent,
    ListadoNovelasComponent,
    TablaNovelasComponent,
    MisSeguidasComponent,
    MisNovelasComponent,
    MapaWebComponent,
    FooterComponent
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
    {provide: LOCALE_ID, useValue: 'es'},
    UsuariosService,
    NovelasService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
