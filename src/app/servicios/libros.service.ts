import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//interfaces
import { Libro } from '../interfaces/libro';
@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  urlAPI="http://localhost:8001";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  consultarTodosLibros():Observable<Libro[]>{
    return this.http.get<Libro[]>(this.urlAPI + "/libro");
  }
  consultarLibro(id:string):Observable<Libro>{
    return this.http.get<Libro>(this.urlAPI + "/libro/" + id);
  }
  altaLibro(formData : FormData):Observable<any>{
    return this.http.post<any>(this.urlAPI + "/api/libro/nuevo",formData);
  }
  editarLibro(formData: FormData):Observable<any>{
    return this.http.post(this.urlAPI + "/api/libro/editar",formData)
  }
  borrarLibro(libro:Libro):Observable<any>{
    return this.http.delete(this.urlAPI + "/api/libro/borrar/" + libro.id)
  }
}
