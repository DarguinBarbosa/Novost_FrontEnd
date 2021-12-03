import { filter } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import {Ng2SmartTableModule} from 'ng2-smart-table'
@Component({
  selector: 'novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements OnInit {
  tableSettings = {
    noDataMessage:'No se han encontrado datos',
   actions:true,
    columns: {
      id: {
        hide:true
      },
      estadoNovedad: {
        title: 'Estado',
        type: 'text',
        filter: true,
      },
      acta: {
        hide:true
      },
      fechaSolicitud: {
        title: 'Fecha Solicitud',
        type: 'date',
        filter: true,
      },
      nombre: {
        title: 'Aprendiz',
        filter: true,
      },
      t: {
        title: 'Tipo Novedad',
        filter: true,
      }
    }
  };
  data=[]
  constructor(private service:ServicesService){}
   ngOnInit(): void {
    this.service.getNovedad().subscribe(list=>
      { let array =  list.map(item=>{
        item.nombre=`${item.nombre} ${item.apellido}`
        let indice =item.fechaSolicitud.indexOf("T");
        item.fechaSolicitud = item.fechaSolicitud.substring(1, indice);
      })
      this.data= list
      })
  }

}




