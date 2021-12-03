import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkrol(route);
  }
  checkrol(route:ActivatedRouteSnapshot):boolean{
const datos= JSON.parse(localStorage.getItem('data'))
const {scopes=[]} = datos.rolUsuario
scopes.push(datos.rolUsuario)
    
for (let i = 0; i < route.data.rolUsuario.length; i++) {
  if(scopes.includes(route.data.rolUsuario[i])){ 
    return true 
      }
}
this.router.navigate(['/pages/dashboard'])
return false 
}
}
