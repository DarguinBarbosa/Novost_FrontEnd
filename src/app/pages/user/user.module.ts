import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormsModule, ReactiveFormsModule
 } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbStepperModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from 'app/@theme/theme.module';
import { CargaListaComponent } from './carga-lista/carga-lista.component';
import { ActuUserComponent } from './actu-user/actu-user.component';


@NgModule({
  declarations: [UsuarioComponent, CargaListaComponent, ActuUserComponent],
  imports: [
    CommonModule,
    NbInputModule,
    NbDialogModule.forChild(),
    NbIconModule,
   FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbCardModule,
    NbButtonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    UserRoutingModule,
    NbStepperModule,
    NbSelectModule,
  ]
})
export class UserModule { }
