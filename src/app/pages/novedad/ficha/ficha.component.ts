import { ServicesService } from './../services/services.service';
import { Component, OnInit, Optional, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
@Component({
  selector: 'ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit {
  title: String;
  tableSettings = {
    noDataMessage:'No se han encontrado datos',
   actions:{
     add:false,
     edit:false,
     delete:false,
     custom:[{name:'Aprendices',
     title:`ver aprendices`
    }],
    position:'right',
   },
    columns: {
      idFicha: {
        hide:true
      },
      numeroFicha: {
        title: 'Ficha',
        type: 'number',
        filter: true,
      },
      anio: {
        title: 'Año',
        type: 'string',
        filter: true,
      },
        trimestre: {
          title: 'Trimestre',
          filter: true,
        },
        nombreCentro: {
          title: 'Centro',
          filter: true,
        },
        nombreCoordinacion: {
          title: 'Coordinacion',
          filter: true,
        },
        nombrePrograma: {
          title: 'Programa',
          filter: true,
        }
     
    }
  };
  data=[]



Settings = {
  noDataMessage:'No se han encontrado aprendices asociados a esta ficha',
  actions:{
    add:false,
    edit:false,
    delete:false,
    custom:[{name:'Aprendices',
    title:``,
   }],
   hideSubHeader:true,
   position:'right',
  },
    columns: {
      idFicha: {
        hide:true
      },
      nombresUsuario: {
        title: 'Nombre',
        type: 'string',
        filter: true,
      },
      apellidosUsuario: {
        title: 'Apellido',
        type: 'string',
        filter: true,
      },
      numeroDocumentoUsuario: {
        title: 'Numero de Documento',
        filter: true,
      },
      email: {
        title: 'Correo',
        filter: true,
      },
      telefonoAprendiz: {
        title: 'Telefono',
        filter: true,
      },
      tipoDocumentoUsuario: {
        title: ' Tipo Documento',
        filter: true,
      },
      novedad: {
        title: 'Novedad registrada',
        filter: true,
      },
    }
  };
  datos=[]
  numApe=[]
  constructor( private service:ServicesService,private dialogService: NbDialogService,@Optional() private ref: NbDialogRef<any>) { }

  ngOnInit(): void {
    this.service.ficha().subscribe(
      list=>{
        
        let numeroApe= list.length
      this.data = list
      console.log(list)
      this.data.map(len=>{
        len.cantidadAA =numeroApe
      })      
      })
      if(this.title === '1'){
        console.log(this.title )
        console.log( this.Settings)
        this.Settings.actions.custom[0]['title'] ='Agregar Novedad'
       this.Settings.actions.custom
      }
  }
  open(dialog: TemplateRef<any>,  data:any) {
    this.dialogService.open(dialog, { context: `${data}`});
  }

  desercionId(event:any){
    this.ref.close(event.data)
    this.ref.close()

  }



  evento(event:any,dialog: TemplateRef<any>){
    this.open(dialog,event.data.numeroFicha)
    this.service.getApe().subscribe(res=>{
      this.service.getNovedad().subscribe(list=>{
        this.datos = res.filter(res=> res.fichaAprendiz === event.data.idFicha )
       let id= this.datos.filter(res=> res.id)

      
       for (let i = 0; i < this.datos.length; i++){
   
     let info= list.find(list=> this.datos[i]['id'] == list.aprendizNovedad)
            if(info !== undefined){
              console.log(info)
              this.datos[i]['novedad']=`Esta   novedad esta ${info.estadoNovedad}`
        }else{
          this.datos[i]['novedad']=`Sin Novedad`
        }
       }
         
         
    })
  })
  }

}