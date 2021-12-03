import { CargaListaComponent } from './carga-lista/carga-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolGuard } from 'app/@core/guards/rol.guard';
import { SessionGuard } from 'app/@core/guards/session.guard';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  { path:'usuario',
      component:UsuarioComponent,
      data:{
        rolUsuario:['AD'],
        breadcrumb: ' usuario',

      },
      canActivate:[SessionGuard,RolGuard],
    },
    {
      path: 'CargarLista',
      component: CargaListaComponent,
      data: {
          breadcrumb: ' Cargar Lista',
          rolUsuario:['AD']
      },
      canActivate:[SessionGuard,RolGuard],

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
