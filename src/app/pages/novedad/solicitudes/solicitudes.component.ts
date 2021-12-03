import { DocumentoComponent } from './../documento/documento.component';
import { Component, EventEmitter,HostListener,OnInit, Output,OnDestroy, TemplateRef, ViewChild, NgZone, Input } from '@angular/core';
import {  NbDialogService, NbWindowService } from '@nebular/theme';
import { ServicesService } from '../services/services.service';
import swal from'sweetalert2'
@Component({
  selector: 'solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
  tableSettings = {
    noDataMessage:'No se han encontrado datos',
   actions:{
     add:false,
     edit:false,
     delete:false,
     custom:[{name:'asig',
     title:`Asignar ficha`
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
        filter: false,
      },
      anio: {
        title: 'Año',
        type: 'string',
        filter: false,
      },
      trimestre: {
        title: 'Trimestre',
        filter: false,
      }
     
    }
  };
tabledata=[]
  comentario:any  
  estado:any
  path:any=[]
  des:any
  data:any=[]
  term:any
  disponible:any=[]
  url:any
  infoFicha:any
  fecha:any
  constructor(private service:ServicesService,private windowService: NbWindowService,private dialogService: NbDialogService,) { }
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  ngOnInit(): void {
    this.service.getNovedad().subscribe(
      list=>  { list.map(item=>{
        if (item.t == 'Aplazamiento' ) {
          var d = new Date(item.fechaInicio);
       item.fecha = `${this.sumarDias(d, item.duracionA)}`
        }

        if (item.t == 'Traslado Ficha' || item.t == 'Traslado Programa' ) {
            this.service.fichaid(item.fichaAspirante).subscribe(res=>{
              this.infoFicha = res
            })
        }

      let indice =item.fechaSolicitud.indexOf("T");
      let extraida = item.fechaSolicitud.substring(1, indice);
      item.fechaSolicitud=extraida
      // && list.t =="Aplazamiento"
        })
      this.data = list.filter(list=>list.estadoNovedad =="solicitud" )
      console.log(this.data)
      })
  }

   sumarDias(fecha :Date, dias:any){
    fecha.setMonth(fecha.getMonth() + dias);
    return fecha;
  }
  asigFicha(ficha: TemplateRef<any>,dataE:any){
      this.service.ficha().subscribe(res=>{
        console.log(ficha)
       this.path = res.filter(res=>  dataE.ficha==res.numeroFicha ) 
       this.tabledata = res.filter(res=>  
        dataE.ficha!=res.numeroFicha  && 
        dataE.nombrePrograma == res.nombrePrograma &&
        dataE.nombreCentro == res.nombreCentro &&
        dataE.nombreCoordinacion == res.nombreCoordinacion &&
        dataE.trimestre == res.trimestre ) 
        this.dialogService.open(ficha ,{context:dataE});

      })
  }
  open(id:any) {
    this.dialogService.open(DocumentoComponent)
      .onClose.subscribe(name =>{
          this.des = name
          this.devolver(id,this.des)
      })
      
  }
  openWindow() {    
    this.windowService.open(
      this.contentTemplate,
      { title: 'Archivo acta'}
    );
    }
    archivo(data:any){
      //let  l =  data.substring(13)
  this.url = `https://back-end-novost.herokuapp.com${data}`
  let df:any=document.getElementById("ob")
    df.setAttribute('src',this.url)
    }

    aceptar(id:any){
      console.log(id)
      let Solicitud = 'En proceso'
      swal.fire({
        title: '¿Estas seguro de aceptar esta novedades?',
        showDenyButton: true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          swal.fire('Solicitud aceptada!', '', 'success')
          const formdata = new FormData()
          let comentario2 ='Tu novedad a sido aceptada'
          formdata.append('id',id)
          formdata.append('estadoNovedad',Solicitud)
          formdata.append('comentario',comentario2)
          this.service.denegarS(formdata).subscribe(result=>{
            this.ngOnInit()
          })
        } else if (result.isDenied) {
          swal.fire('No se enviaron datos', '', 'info')
        }
      })
    }

    devolver(id:any,cm:any){
      let Solicitud = ' Denegada'
      const formdata = new FormData()
      formdata.append('id',id)
      formdata.append('estadoNovedad',Solicitud)
      formdata.append('comentario',cm.name)
      this.service.denegarS(formdata).subscribe(result=>{
        this.ngOnInit()
      }) 
    }
 

    evento(event:any,info:any){
      let ref:any
     let  Solicitud = 'En proceso'
     console.log(event.data.idFicha)
     console.log(info)
      swal.fire({
        title: '¿Estas seguro de aceptar esta novedades?',
        showDenyButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          swal.fire('Solicitud aceptada', '', 'success')
          const formdata = new FormData()
          formdata.append('id',info.aprendizNovedad)
          formdata.append('fichaAprendiz',event.data.idFicha)
          this.service.updateApe(info.aprendizNovedad,formdata).subscribe(res=>{
          })
          formdata.append('id',info.id)
          formdata.append('estadoNovedad',Solicitud)
          this.service.estado(formdata).subscribe(res=>{
          })
          ref.close()
          this.ngOnInit()

        } else if (result.isDenied) {
          swal.fire('No se enviaron datos', '', 'info')
          this.ngOnInit()
        }
      })
      
    }
}
