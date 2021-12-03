import { ServicesService } from './../../pages/novedad/services/services.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private route:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(req).pipe(
     tap(reqBad =>{
       if(reqBad instanceof HttpResponse){
         console.log(reqBad)
       }
     }),
     catchError((error:HttpErrorResponse)=>{
       console.log(error.status)
       if (error.status == 404) {
        this.route.navigate(['/error'])
      }else if (error.status == 500) {
        this.route.navigate(['/error/500'])
      }else if (error.status == 0) {
        alert('Tenemos un error grave, estamos tratando de solucionarlo')
      }

       return throwError (+error);
       
     })
   )
  }
}
