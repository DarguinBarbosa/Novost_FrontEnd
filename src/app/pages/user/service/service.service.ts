import { HttpClient } from '@angular/common/http';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrlno='https://back-end-novost.herokuapp.com/usuario/usuario/'
  private url='https://back-end-novost.herokuapp.com/usuario/'
  constructor(private http:HttpClient  ) { }
  email(email:string):Observable<any>{
    return this.http.get(`${this.apiUrlno}${email}`)
  }
  // Cerrar Sesion
  cerrarSesion(token:any){
    console.log(`${this.url}Logout?token=${token}`)
    return this.http.get(`${this.url}Logout?token=${token}`)
  }
// Ficha
  AgregarFicha(form:any):Observable<any>{
    console.log(form.get('versionPrograma'))
    return this.http.post<any>(`${this.url}ficha/`, form)
  }
  getFicha():Observable<any>{
    return this.http.get<any>(`${this.url}ficha/`)
  }
  cargarFicha(form:FormData):Observable<FormData>{
    return this.http.post<FormData>(`https://back-end-novost.herokuapp.com/usuario/lista/`, form)
  }
  // Usuario
  getUser():Observable<any>{
    return this.http.get<any>(this.apiUrlno)
  } 
  getUserid(id:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrlno}${id}/`) 
  } 
  createUser(form:any):Observable<any>{
    return this.http.post<any>(this.apiUrlno, form)
  }
  updateUser(id:number,form:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrlno}${id}/`,form)
  }
  // Agregar Aprendiz
  createApe(form:any):Observable<any>{
    return this.http.post<any>(`${this.url}aprendiz/`,form)
  }
  getApe():Observable<any>{
    return this.http.get<any>(`${this.url}aprendiz/`)
  }


}
