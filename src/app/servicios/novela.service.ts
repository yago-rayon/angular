import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//interfaces
import { Novela } from '../interfaces/novela';
@Injectable({
  providedIn: 'root'
})
export class NovelaService {
  urlAPI="http://localhost:3001";
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
      data.listaGeneros.forEach(genero => {
        queryParams.append('genero', genero);
      });
    }
    if(data.listaEtiquetas){
      data.listaEtiquetas.forEach(etiqueta => {
        queryParams.append('etiqueta', etiqueta);
      });
    }
    queryParams.append('ordenar', data.ordenar || 'visitas');
    queryParams.append('direccion', data.direccion || 'desc');
    return this.http.get(this.urlAPI + "/api/novela/",{params: queryParams});
  }
  consultarNovela(id:string):Observable<Novela>{
    return this.http.get<Novela>(this.urlAPI + "/api/novela/" + id);
  }
  altaNovela(formData : FormData):Observable<any>{
    return this.http.post(this.urlAPI + "/api/novela/nueva",formData);
  }
  editarNovela(formData: FormData,idNovela:any):Observable<any>{
    return this.http.put(this.urlAPI + "/api/novela/"+idNovela, formData)
  }
  borrarNovela(novela:any):Observable<any>{
    return this.http.delete(this.urlAPI + "/api/libro/borrar/" + novela._id)
  }
}