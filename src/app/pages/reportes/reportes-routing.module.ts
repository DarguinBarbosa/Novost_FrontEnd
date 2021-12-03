import { ReportesGeneralesComponent } from './reportes-generales/reportes-generales.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'reportes_generales',
    pathMatch: 'full',
    component: ReportesGeneralesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
