import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private cookie:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try{
      const token = this.cookie.get('token')
      let newrequest = request

      newrequest = request.clone({
        setHeaders:{
          authorization:`token ${token}`
        }
      })
      return next.handle(newrequest)
    }catch(e){
      console.log('Hay UN ERROR', e)
      return next.handle(request)
    }
  }
}
