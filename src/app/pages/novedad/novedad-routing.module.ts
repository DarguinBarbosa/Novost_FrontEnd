import { CambioFichaComponent } from './cambio-ficha/cambio-ficha.component';
import { DesercionComponent } from './desercion/desercion.component';
import { CancelacionComponent } from './cancelacion/cancelacion.component';
import { FichaComponent } from './ficha/ficha.component';
import { ReintegroComponent } from './reintegro/reintegro.component';
import { AplazamientoComponent } from './aplazamiento/aplazamiento.component';
import { RetiroVoluntarioComponent } from './retiro-voluntario/retiro-voluntario.component';
import { NovedadesComponent } from './novedades/novedades.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolGuard } from 'app/@core/guards/rol.guard';
import { SessionGuard } from 'app/@core/guards/session.guard';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';

const routes: Routes = [
  {
    path:'novedades',
    component:NovedadesComponent,
    data:{
      rolUsuario:['AA'],
      breadcrumb: 'Novedades'
    },
    canActivate:[SessionGuard,RolGuard],
  },
  {
    path:'retiro_voluntario',
    component:RetiroVoluntarioComponent,
    data:{
      rolUsuario:['AP'],
      breadcrumb: ' Retiro Voluntario'
    },
    canActivate:[SessionGuard,RolGuard]
  }, {
    path:'retiro_voluntario/:id',
    component:RetiroVoluntarioComponent,
    data:{
      rolUsuario:['AP'],
      breadcrumb: ' Retiro Voluntario/:id'

    },
    canActivate:[SessionGuard,RolGuard]
  },
  {
    path:'aplazamiento',
    component:AplazamientoComponent,
    data:{
      rolUsuario:['AP'],
      breadcrumb: 'Aplazamiento'
      
    },
    canActivate:[SessionGuard,RolGuard]
  },
  {
    path:'reintegro',
    component:ReintegroComponent,
    data:{
      rolUsuario:['AP'],
      breadcrumb: 'Reintegro'

    },
    canActivate:[SessionGuard,RolGuard]
  },
  {
    path:'solicitudes',
    component:SolicitudesComponent,
    data:{
      rolUsuario:['AA'],
      breadcrumb: 'Solicitudes'
    },
    canActivate:[SessionGuard,RolGuard]
  },
  {
    path:'ficha',
    component:FichaComponent,
    data:{
      rolUsuario:['AA','IN','AD'],
      breadcrumb: 'Ficha'
    },
    canActivate:[SessionGuard,RolGuard]
  },
   {
    path:'cancelacion',
    component:CancelacionComponent,
    data:{
      rolUsuario:['AA','IN'],
      breadcrumb: 'Cancelación'

    },
    canActivate:[SessionGuard,RolGuard]
  },
  {
   path:'desercion',
   component:DesercionComponent,
   data:{
     rolUsuario:['AA','IN'],
     breadcrumb: 'Deserción'

   },
   canActivate:[SessionGuard,RolGuard]
 },
 {
  path:'traslado',
  component:CambioFichaComponent,
  data:{
    rolUsuario:['AP'],
    breadcrumb: 'Traslado'
  },
  canActivate:[SessionGuard,RolGuard]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovedadRoutingModule { }
