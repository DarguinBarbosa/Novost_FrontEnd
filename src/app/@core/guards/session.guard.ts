import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(private cookie:CookieService, private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }
  
  check():boolean{
    try{
   const token :boolean =  this.cookie.check('token')
   if(!token){
     this.router.navigate(['/','login'])
   }
      return token   
    }catch(e){
      console.log('Algo salio mal ')
      return false
    }
    //return true 
  }
}
