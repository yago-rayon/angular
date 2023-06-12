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
  urlAPI=Constantes.urlApi;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };
  constructor(private http:HttpClient) { }

  consultarNovelas(data:any):Observable<any>{
    let queryParams = new HttpParams();
    queryParams.append('page',data.pagina || '');
    queryParams.append('limite',data.limite || '');
    if(data.listaGeneros){
      data.listaGeneros.forEach((genero: string) => {
        queryParams.append('genero', genero);
      });
    }
    if(data.listaEtiquetas){
      data.listaEtiquetas.forEach((etiqueta: string) => {
        queryParams.append('etiquetas', etiqueta);
      });
    }
    queryParams.append('ordenar', data.ordenar || 'visitas');
    queryParams.append('direccion', data.direccion || 'desc');
    return this.http.get(this.urlAPI + "/novela/",{params: queryParams});
  }
  consultarNovela(id:string):Observable<any>{
    return this.http.get<any>(this.urlAPI + "/novela/" + id);
  }
  seguirNovela(id:string):Observable<any>{
    return this.http.put<any>(this.urlAPI + "/novela/seguir/" + id,'');
  }
  consultarNovelaTitulo(titulo:string):Observable<any>{
    return this.http.get<any>(this.urlAPI + "/novela/" + titulo);
  }
  consultarNovelasSeguidas(): Observable<any>{
    return this.http.get(this.urlAPI + "/novela/seguidas");
  }
  altaNovela(novela:Novela, imagenASubir: File):Observable<any>{
    let formData: FormData = new FormData();
    formData.append('titulo', novela.titulo);
    formData.append('descripcion', novela.descripcion);
    let listaGeneros = [];
    for(const genero in novela.generos){
      if(novela.generos[genero]){
        listaGeneros.push(genero);
      }
    }
    formData.append('generos', JSON.stringify(listaGeneros));
    let listaEtiquetas: Array<any>=[];
    for(const etiqueta in novela.etiquetas){
      if(novela.etiquetas[etiqueta]){
        listaEtiquetas.push(etiqueta);
      }
    }
    formData.append('etiquetas', JSON.stringify(listaEtiquetas));
    formData.append('descripcion', novela.descripcion.toString());
    
    if (imagenASubir) {
      formData.append('imagen', imagenASubir, imagenASubir.name);
    } else {
      formData.append('imagen', novela.imagen);
    }
    return this.http.post(this.urlAPI + "/novela/nueva",formData);
  }
  editarNovela(formData: FormData, idNovela:any):Observable<any>{
    return this.http.put(this.urlAPI + "/novela/"+idNovela, formData)
  }
  borrarNovela(novela:any):Observable<any>{
    return this.http.delete(this.urlAPI + "/novela/" + novela._id)
  }
}