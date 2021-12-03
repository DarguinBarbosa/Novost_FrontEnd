import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = 'https://back-end-novost.herokuapp.com'
  constructor(private http:HttpClient,private cookie:CookieService) { }
  validar(data:any):Observable<any>{
   return this.http.post(`${this.url}`,data).pipe(
     tap(tokens=>{
      const date: Date = new Date()
      date.setHours(date.getHours()+1)
       const {token,user}=tokens
      localStorage.setItem('data',JSON.stringify(user))
      this.cookie.set('token',token,date,'/')
     })
   )
  }
  cerrarSesion(token:any){
    console.log(`${this.url}Logout?token=${token}`)
    return this.http.get(`${this.url}Logout?token=${token}`)
  }

    // Agregar contraseña
    restPass(email:any):Observable<any>{
      return this.http.post<any>(`${this.url}/usuario/correo/${email}/`,email)
    }
}
