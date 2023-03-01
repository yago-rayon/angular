//Modulos
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule,NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Componentes
import { AppComponent } from './app.component';
import { CrearAutorComponent } from './componentes/crear-autor/crear-autor.component';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { TablaAutoresComponent } from './componentes/tabla-autores/tabla-autores.component';
import { MenuComponent } from './componentes/menu/menu.component';
//Servicios
import { AutoresService } from './servicios/autores.service';


@NgModule({
  declarations: [
    AppComponent,
    CrearAutorComponent,
    RegistroComponent,
    LoginComponent,
    TablaAutoresComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbCollapseModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true},
    AutoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
