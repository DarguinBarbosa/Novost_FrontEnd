import { ActuUserComponent } from './../../../pages/user/actu-user/actu-user.component';
import { ServiceService } from '../../../login/service.service';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbIconConfig, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbToastRef, NbToastrService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  currentTheme = 'default';

  userMenu = [];


  constructor(
    private toastrService: NbToastrService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private route:Router,
              private service:ServiceService,
              private cookie:CookieService,
              private breakpointService: NbMediaBreakpointsService,
              private router:Router,
              private dialogService: NbDialogService) {
  }

  ngOnInit() {
 let  datos= JSON.parse(localStorage.getItem('data'))
 let rol :any
   let  data:string = datos.nombresUsuario+" "+datos.apellidosUsuario;
     const users = {
      usu:{name:data}
    };
    switch(datos.rolUsuario){
      case 'AA':{
        rol='Perteneces Apoyo Administrativo'
        break;
      }
      case 'AD':{
        rol='Bienvenido, eres Administrador'
        break;
      }
      case 'IN':{
        rol='Bienvenido, eres Instructor'
        break;
      }
      case 'AP':{
        rol='Bienvenido, eres Aprendiz'
        break;
      }
      case 'CO':{
        rol='Bienvenido, eres Coordinador'
        break;
      }
      
    }
   this.toastrService.show(
      `Hola!! ${data}`, `${rol}`,{icon:'',duration:5000,status:'warning'});
      
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        this.user = users.usu;});

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

  }
 

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  
  cerrarSession(){
  let token = this.cookie.get('token')
    this.service.cerrarSesion(token)
    this.cookie.delete('token','/');
    localStorage.removeItem('data')

    this.route.navigate(['/login']).then(()=>
    window.location.reload());
    this.ngOnDestroy()
  }


  userM(){
    this.dialogService.open(ActuUserComponent)

  }
}
