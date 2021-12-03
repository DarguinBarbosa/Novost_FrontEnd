import { UserModule } from './user/user.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolGuard } from 'app/@core/guards/rol.guard';
import { SessionGuard } from 'app/@core/guards/session.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: 'Dashboard'
    },
        canActivate:[SessionGuard]
    },  
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    { path:'novedades',
      loadChildren:()=>import(`./novedad/novedad.module`).then(m=>m.NovedadModule),
      data:{
        rolUsuario:['IN','AP','AA','AD'],
        breadcrumb: 'Novedades'

      },
      canActivate:[SessionGuard,RolGuard]
    },  
    { path:'user',
      loadChildren:()=>import(`./user/user.module`).then(m=>m.UserModule),
      data:{
        rolUsuario:['IN','AP','AA','CO','AD']
      },
      canActivate:[SessionGuard,RolGuard]
    },
    { path:'reporte',
    loadChildren:()=>import(`./../pages/reportes/reportes.module`).then(m=>m.ReportesModule),
    data:{
      rolUsuario:['IN','AA','AD','CO'],
      breadcrumb: 'Reportes'

    },
    canActivate:[SessionGuard,RolGuard]
  },
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
