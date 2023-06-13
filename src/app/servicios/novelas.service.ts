import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//interfaces
import { Novela } from '../interfaces/novela';
import { Constantes } from '../constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class NovelasService {
  urlAPI = Constantes.urlApi;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };
  constructor(private http: HttpClient) { }

  consultarNovelas(data: any): Observable<any> {
    let queryParams={
      pagina : data.pagina || 1,
      limite : data.limite || 1,
      generos : JSON.stringify(data.generos),
      etiquetas : JSON.stringify(data.etiquetas),
      direccion :  data.direccion || 'desc',
      ordenar :  data.ordenar || 'visitas'
    }
    return this.http.get(this.urlAPI + "/novela/buscadorDinamico/", { params: queryParams });
  }
  consultarNovela(id: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + "/novela/" + id);
  }
  seguirNovela(id: string): Observable<any> {
    return this.http.put<any>(this.urlAPI + "/novela/seguir/" + id, '');
  }
  consultarNovelasTitulo(titulo: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + "/novela/buscar/" + titulo);
  }
  consultarNovelasGenero(genero: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + "/novela/buscarGenero/" + genero);
  }
  consultarNovelasEtiqueta(etiqueta: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + "/novela/buscarEtiqueta/" + etiqueta);
  }
  consultarNovelasSeguidas(): Observable<any> {
    return this.http.get(this.urlAPI + "/novela/seguidas");
  }
  consultarNovelasPublicadas(): Observable<any> {
    return this.http.get(this.urlAPI + "/novela/publicadas");
  }
  altaNovela(novela: Novela, imagenASubir?: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('titulo', novela.titulo);
    let listaGeneros = [];
    for (const genero in novela.generos) {
      if (novela.generos[genero]) {
        listaGeneros.push(genero);
      }
    }
    formData.append('generos', JSON.stringify(listaGeneros));
    let listaEtiquetas: Array<any> = [];
    for (const etiqueta in novela.etiquetas) {
      if (novela.etiquetas[etiqueta]) {
        listaEtiquetas.push(etiqueta);
      }
    }
    formData.append('etiquetas', JSON.stringify(listaEtiquetas));
    formData.append('descripcion', novela.descripcion.toString());

    if (imagenASubir) {
      formData.append('imagen', imagenASubir, imagenASubir.name);
    }
    return this.http.post(this.urlAPI + "/novela/nueva", formData);
  }
  altaCapitulo(titulo, contenido, novela_id) {
    return this.http.post(this.urlAPI + "/novela/" + novela_id + "/nuevoCapitulo", { titulo: titulo, contenido: contenido });
  }
  editarCapitulo(titulo, contenido, novela_id, numero) {
    return this.http.put(this.urlAPI + "/novela/" + novela_id + "/capitulo/" + numero, { titulo: titulo, contenido: contenido });
  }
  borrarCapitulo(novela_id, numero) {
    return this.http.delete(this.urlAPI + "/novela/" + novela_id + "/capitulo/" + numero);
  }
  editarNovela(novela: Novela, imagenASubir?: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('titulo', novela.titulo);
    let listaGeneros = [];
    for (const genero in novela.generos) {
      if (novela.generos[genero]) {
        listaGeneros.push(genero);
      }
    }
    formData.append('generos', JSON.stringify(listaGeneros));
    let listaEtiquetas: Array<any> = [];
    for (const etiqueta in novela.etiquetas) {
      if (novela.etiquetas[etiqueta]) {
        listaEtiquetas.push(etiqueta);
      }
    }
    formData.append('etiquetas', JSON.stringify(listaEtiquetas));
    formData.append('descripcion', novela.descripcion.toString());

    if (imagenASubir) {
      formData.append('imagen', imagenASubir, imagenASubir.name);
    }
    return this.http.put(this.urlAPI + "/novela/" + novela._id, formData)
  }
  borrarNovela(novela: any): Observable<any> {
    return this.http.delete(this.urlAPI + "/novela/" + novela._id)
  }
}