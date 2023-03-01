import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//interfaces
import { Autor } from '../interfaces/autor';
@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  urlAPI="http://localhost:8001";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  consultarTodosAutores():Observable<Autor[]>{
    return this.http.get<Autor[]>(this.urlAPI + "/autor");
  }
  consultarAutor(id:string):Observable<Autor>{
    return this.http.get<Autor>(this.urlAPI + "/autor/" + id);
  }
  altaAutor(formData : FormData):Observable<any>{
    return this.http.post<any>(this.urlAPI + "/api/autor/nuevo",formData);
  }
  editarAutor(autor:Autor):Observable<any>{
    return this.http.put(this.urlAPI + "/api/autores",autor,this.httpOptions)
  }
  borrarAutor(autor:Autor):Observable<any>{
    return this.http.delete(this.urlAPI + "/api/autores/" + autor.id)
  }
}
