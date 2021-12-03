import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbSelectModule, NbToastrModule,  NbToastrConfig, NbTreeGridModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { NovedadRoutingModule } from '../novedad/novedad-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbWindowModule.forRoot(),
    NbWindowModule.forChild(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSelectModule,
    NbCardModule,
    NbButtonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    NovedadRoutingModule,
    NbEvaIconsModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
