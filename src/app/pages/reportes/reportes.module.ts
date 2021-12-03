import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesGeneralesComponent } from './reportes-generales/reportes-generales.component';
import { ChartsModule } from 'ng2-charts';
import pdfFonts from "pdfmake/build/vfs_fonts"
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbSelectModule, NbTreeGridModule, NbWindowModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'app/@theme/theme.module';

PdfMakeWrapper.setFonts(pdfFonts)

@NgModule({
  declarations: [ReportesGeneralesComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    ChartsModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forRoot(),
    NbSelectModule,
    NbCardModule,
    NbButtonModule,
    ThemeModule,
  ]
})
export class ReportesModule { }
