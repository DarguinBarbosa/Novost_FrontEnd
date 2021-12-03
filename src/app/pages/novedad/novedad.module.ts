import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NovedadRoutingModule } from './novedad-routing.module';
import { NovedadesComponent } from './novedades/novedades.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule, NbTreeGridModule, NbWindowModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { RetiroVoluntarioComponent } from './retiro-voluntario/retiro-voluntario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReintegroComponent } from './reintegro/reintegro.component';
import { AplazamientoComponent } from './aplazamiento/aplazamiento.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { DocumentoComponent } from './documento/documento.component';
import { FichaComponent } from './ficha/ficha.component';
import { CambioFichaComponent } from './cambio-ficha/cambio-ficha.component';
import { AsigFichaComponent } from './asig-ficha/asig-ficha.component';
import { CancelacionComponent } from './cancelacion/cancelacion.component';
import { DesercionComponent } from './desercion/desercion.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { InterceptorService } from 'app/@core/interceptor/interceptor.service';



@NgModule({
  declarations: [NovedadesComponent,
     RetiroVoluntarioComponent,
      ReintegroComponent,
       AplazamientoComponent,
        SolicitudesComponent, 
        DocumentoComponent, FichaComponent, CambioFichaComponent, AsigFichaComponent, CancelacionComponent, DesercionComponent
  ],
  imports: [
    CommonModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbWindowModule.forRoot(),
    NbWindowModule.forChild(),
    NbDialogModule.forRoot(),
    NbSelectModule,
    NbCardModule, 
    NbFormFieldModule,
    NbIconModule,
    NbButtonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbTreeGridModule,
    NovedadRoutingModule,
    NbEvaIconsModule,
    Ng2SearchPipeModule
  ],
   providers: [
   
],
})
export class NovedadModule { }
