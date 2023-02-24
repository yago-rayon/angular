//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Componentes
import { AppComponent } from './app.component';
import { CrearAutorComponent } from './componentes/crear-autor/crear-autor.component';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CrearAutorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
