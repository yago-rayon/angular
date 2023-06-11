import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constantes } from '../constantes/constantes';
//interfaces
import { Usuario } from '../interfaces/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  urlAPI=Constantes.urlApi;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };
  constructor(private http:HttpClient) { }

  consultarTodos():Observable<any>{
    return this.http.get<any>(this.urlAPI + "/usuario");
  }
  consultarUno(id:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.urlAPI + "/usuario/" + id);
  }
  altaUsuario(formData : FormData):Observable<any>{
    return this.http.post<any>(this.urlAPI + "/usuario/nuevo",formData);
  }
  editarUsuario(formData: FormData):Observable<any>{
    return this.http.post(this.urlAPI + "/usuario/editar",formData)
  }
  borrarUsuario(usuario:Usuario):Observable<any>{
    return this.http.delete(this.urlAPI + "/usuario/borrar/" + usuario._id)
  }
}
