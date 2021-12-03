import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Img, ITable, Item, Ol, PdfMakeWrapper, Table, Txt, Ul } from 'pdfmake-wrapper';
import { Component, OnInit, TemplateRef } from '@angular/core';
  

import { Label } from 'ng2-charts';
import { ServicesService } from 'app/pages/novedad/services/services.service';
import { NbDialogService } from '@nebular/theme';
import {ServiceService} from './../../user/service/service.service'

@Component({
  selector: 'reportes-generales',
  templateUrl: './reportes-generales.component.html',
  styleUrls: ['./reportes-generales.component.scss']
})
export class ReportesGeneralesComponent implements OnInit {
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Numero de Novedades'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  estadistica():any{
    this.Service.getNovedad().subscribe(res=>{
      this.numero =  res.filter(res=>res.tipoNovedad== 1).length
     let apla =  res.filter(res=>res.tipoNovedad== 2).length
      let reVo =  res.filter(res=>res.tipoNovedad== 3).length
      let rein =  res.filter(res=>res.tipoNovedad== 4).length
      let canCon =  res.filter(res=>res.tipoNovedad== 5).length
      let canA =  res.filter(res=>res.tipoNovedad== 6).length
      let TP =  res.filter(res=>res.tipoNovedad== 7).length
      console.log(TP)
      let  TFicha=  res.filter(res=>res.tipoNovedad== 8).length
      console.log(TFicha)

    this.barChartData.map(res=>{
      switch (res.label) {
        case 'Desercion':  res.data[0]=this.numero; break;
        case 'Aplazamiento':  res.data[0]=apla; break;
        case 'Retiro Voluntario':  res.data[0]=reVo; break;
        case 'Cancelacion Academica':  res.data[0]=canA; break;
        case 'Cancelacion por convivencia':  res.data[0]=canCon; break;
        case 'Reintegro':  res.data[0]=rein; break;
        case 'Traslado Programa':  res.data[0]=TP; break;
        case 'Traslado Ficha':  res.data[0]=TFicha; break;
        default:
          break; 
      }
    })
  })

  }

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Desercion' },
    { data: [], label: 'Aplazamiento' },
    { data: [], label: 'Retiro Voluntario' },
    { data: [], label: 'Cancelacion Academica' },
    { data: [], label: 'Cancelacion por convivencia' },
    { data: [], label: 'Reintegro' },
    { data: [], label: 'Traslado Programa' },
    { data: [], label: 'Traslado Ficha' }
  ];
    selectFicha:any
    datosNove=[]
    informa:any
    infornove:any
    form:FormGroup
    tipoNovedad:any
    reporteFecha:any
    ficha:any
    ape:any
    numero:number
    id:number
    select:false
    constructor(private fb:FormBuilder,private userServices:ServiceService,private Service:ServicesService,private dialogService: NbDialogService){
      this.form = this.fb.group({
        ficha:[null],
        aprendiz:[null],
        tipoNove:[null],
        fecha:[null],
        fechaF:[null]
      })
      
    }
    ngOnInit(): void {
      this.estadistica()
    }


    generarPDF(){
      const pdf = new PdfMakeWrapper();
      this.Service.getNovedad().subscribe(async row=>{
        this.datosNove= row.map(row=>{
          let indice =row.fechaSolicitud.indexOf("T");
          row.fechaSolicitud = row.fechaSolicitud.substring(1, indice);
         return [row.nombre,row.apellido,row.correo,row.t,row.fechaSolicitud,row.ficha]})
        pdf.styles({ img:{ width: 1,  height: 1 }})
        pdf.add
        (new Txt([
          new Txt('Reporte Novost \n').bold().end,
          new Txt('Reporte Global de Aprendices que han realizado una novedad').end,
        ]).alignment('center').relativePosition(0,30).end )
        pdf.header(await new Img('../../../../assets/img/logo_n.png').width(100).relativePosition(35,30).build());
        pdf.add(this.createTabla(this.datosNove))
        pdf.create().open()
      })
    }   
    fichas(){
      this.userServices.getFicha().subscribe(res=>{
        this.selectFicha=res
    })
    }

identificarPdf(){
  let formulario={
    fi:this.form.value.ficha,
    aprendiz:this.form.value.aprendiz,
    tipoNove:this.form.value.tipoNove,
    fecha1:this.form.value.fecha,
    fecha2:this.form.value.fechaF
}
  this.reporteFecha = formulario
  if(formulario.fi && formulario.aprendiz == null && formulario.tipoNove == null ){
    this.fichaReport('rf')
  }
  else if(formulario.fi && formulario.aprendiz){
    this.fichaReport('rApe')
  }
 else if(formulario.fi && formulario.tipoNove){
    this.fichaReport('rtipo')

  }
  else if(formulario.tipoNove){
    this.fichaReport('rtipo')

  }else if(formulario.fecha1 < formulario.fecha2){
    this.fichaReport('rF_F1')
  }else if(formulario.fecha1){
    this.fichaReport('rF_F1')
  }
  else{
    console.log(`Error`)
  }
  this.form.reset()
}

  capturarTipo(e:any){
    this.Service.getNovedad().subscribe(async row=>{
      console.log( e, this.ficha)
   if(this.ficha != undefined && row.length !=0){      
     row = row.filter(row=> row.tipoNovedad == e &&  row.ficha == this.ficha)
   this.tipoNovedad= row.map(result=>{
    
     let indice =result.fechaSolicitud.indexOf("T");
     result.fechaSolicitud = result.fechaSolicitud.substring(1, indice);
       return [result.nombre,result.apellido,result.correo,result.t,result.fechaSolicitud,result.ficha]})
      }else if( row.length){
        row = row.filter(row=> row.tipoNovedad == e)
        this.tipoNovedad= row.map(res=>{
          let indice =res.fechaSolicitud.indexOf("T");
          res.fechaSolicitud = res.fechaSolicitud.substring(1, indice);
          console.log(row)
            return [res.nombre,res.apellido,res.correo,res.t,res.fechaSolicitud,res.ficha]})
      }
    })
    }
  async fichaReport(tipoPdf:any){
    const pdf = new PdfMakeWrapper();
    pdf.styles({ img:{ width: 1,  height: 1 }})
    pdf.add
    (new Txt([
      new Txt('Reporte Novost \n').bold().end,
      new Txt('Reporte personalizado').end,
    ]).alignment('center').relativePosition(0,30).end )
    pdf.header(await new Img('../../../../assets/img/ima.png').width(100).relativePosition(35,30).build());
    this.Service.getNovedad().subscribe(async row=>{
      if(tipoPdf=='rApe'){
        this.select= false
        pdf.add(this.AprendizPdf())
        pdf.create().open()
      }else if(tipoPdf=='rtipo'){
        if(this.tipoNovedad.length == 0){
          pdf.add
          (new Txt([
            new Txt('No se encontraron aprendices que esten asociados a una novedad').bold().end,
          ]).alignment('center').relativePosition(0,60).end )
          pdf.create().open()
        }else{
        pdf.add(this.createTabla(this.tipoNovedad))
        pdf.create().open()

            }
                }
      else if(tipoPdf=='rf'){
  row = row.filter(row=> row.ficha == this.ficha)
      this.datosNove= row.map(row=>{
        let indice =row.fechaSolicitud.indexOf("T");
        row.fechaSolicitud = row.fechaSolicitud.substring(1, indice);
       return [row.nombre,row.apellido,row.correo,row.t,row.fechaSolicitud,row.ficha]})
      if(row.length == 0){
        pdf.add
      (new Txt([
        new Txt('No se encontraron aprendices que esten asociados a una novedad').bold().end,
      ]).alignment('center').relativePosition(0,60).end )
      pdf.create().open()
      }else{
      pdf.add(this.createTabla(this.datosNove))
      pdf.create().open()
      }
     }else if(tipoPdf=='rF_F1'){
      row.map(row=>{
        let indice =row.fechaSolicitud.indexOf("T");
        row.fechaSolicitud = row.fechaSolicitud.substring(1, indice);
      })
      console.log(row)
      let fechasEncon :any
      if (this.reporteFecha.fecha1 < this.reporteFecha.fecha2 ) {
         fechasEncon = row.filter(row=> row.fechaSolicitud  >= this.reporteFecha.fecha1 && 
          row.fechaSolicitud <  this.reporteFecha.fecha2 )
         
      }else{
        fechasEncon = row.filter(row=> row.fechaSolicitud >= this.reporteFecha.fecha1 )
      }
      fechasEncon=fechasEncon.map(row=>{
        return [row.nombre,row.apellido,row.correo,row.t,row.fechaSolicitud,row.ficha]
      })
      if(fechasEncon.length == 0){
        pdf.add
      (new Txt([
        new Txt('Para esta fecha no existe ninguna novedad').bold().end,
      ]).alignment('center').relativePosition(0,60).end )
      pdf.create().open()
      }else{
      pdf.add(this.createTabla(fechasEncon))
      pdf.create().open()
      }
     }
     })
  }
  infoApe(data:any):any{
    this.informa = data
    this.Service.getNovedad().subscribe( row=>{
     this.infornove=row.filter(row=> this.informa.id == row.aprendizNovedad)
     this.infornove.map(res=>{
      let indice =res.fechaSolicitud.indexOf("T");
      let extraida = res.fechaSolicitud.substring(1, indice);
      res.fechaSolicitud=extraida 
      this.infornove = res})
    })
  }
  
  AprendizPdf():any{
    let info = this.informa
    let infoNove = this.infornove
     let novedadInfo
     console.log(infoNove)
    if(infoNove.length == 0){
      novedadInfo ="este Aprendiz no se encuentra asociado a ninguna novedad"
    return new Txt([
     `Actualmente ${novedadInfo} Aprendiz ${info.nombresUsuario} ${info.apellidosUsuario}
     Numero de documento ${info.numeroDocumentoUsuario}
     Tipo Documento ${info.tipoDocumentoUsuario}
     Telefono  ${info.telefonoAprendiz}
     Gmail ${info.email}`
   ]).relativePosition(40,100).end
   }  else{
   return new Txt([
     `Actualmente el aprendiz ${info.nombresUsuario} ${info.apellidosUsuario}, identificado con tipo de documento ${info.tipoDocumentoUsuario} ${info.numeroDocumentoUsuario}, cuyos datos de contacto son:
     Telefono: ${info.telefonoAprendiz}
     Email: ${info.email}
     Se encuentra en una novedad de tipo: "${infoNove.t}", realizada en la fecha: "${infoNove.fechaSolicitud}". 
     El estado de esta novedad es " En ${infoNove.estadoNovedad}"`
   ]).relativePosition(20,100).end
 }   
    
  }
  createTabla(data:any):any{
    [{}]
    return new Table([
      ['Nombre','Apellidos','Correo','Tipo Novedad','Fecha','Ficha'],
     ...data
    ])
    .layout('lightHorizontalLines').relativePosition(10,90)
    .end
  }

  open(dialog: TemplateRef<any>) {
    this.fichas()
    this.dialogService.open(dialog);
  }

  aprendiz(){
    this.userServices.getApe().subscribe(reply=>{
      reply =reply.filter(reply=>reply.fichaAprendiz == this.id)
    this.ape=reply
    })
  }
  captura(number:any,id:any){
    this.id = id
    this.ficha =number
    this.aprendiz()
  }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public randomize(): void {
    this.ngOnInit()
    }

}
