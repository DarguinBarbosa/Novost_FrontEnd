import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private url='https://back-end-novost.herokuapp.com/'
  private apiUrlno='https://back-end-novost.herokuapp.com/novedades'
private solicitud='https://back-end-novost.herokuapp.com/novedades/solicitudA'
private denegar='https://back-end-novost.herokuapp.com/novedades/denegar'
  constructor(private http:HttpClient  ) { }///private massages:massagesService

// Novedades
  getNovedad():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrlno}/denovedad`)
  }
  estado(form:FormData):Observable<FormData>{
    console.log(form.get("id"))
    return this.http.put<FormData>(this.solicitud,form)
  }

  denegarS(form:FormData):Observable<any>{
    console.log(form.get("id"))
    return this.http.put<any>(this.denegar,form)
  }

  verificarNove(id:any):Observable<Boolean>{
    return this.http.get<any>(`${this.apiUrlno}/denovedad/${id}/`)
  }

// Ficha  aqui obtenemos todos los datos de la ficha
  ficha():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}usuario/ficha`)
  }
  //   aqui obtenemos  la ficha por el id
  fichaid(id:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.url}usuario/ficha/${id}`)
  }
// Aprendiz 
  getApe():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}usuario/aprendiz`)
  } 
  updateApe(id:any, form:FormData):Observable<any[]>{
    return this.http.put<any[]>(`${this.url}usuario/aprendizF/${id}/`, form)
  }
  // GENERAR LA NOVEDAD
  retiroVo(form:FormData):Observable<FormData>{
    return this.http.post<FormData>(`${this.url}novedades/crearnovedad/`,form)
  }
  updateNove(form:FormData):Observable<FormData>{
    return this.http.put<FormData>(`${this.url}novedades/crearnovedad/`,form)
  }
}

