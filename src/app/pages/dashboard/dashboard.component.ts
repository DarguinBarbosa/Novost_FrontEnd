import { Component, HostBinding, TemplateRef, ViewChild } from '@angular/core';
import { NbIconConfig, NbToastRef, NbToastrService, NbWindowService } from '@nebular/theme';
import { ServicesService } from '../novedad/services/services.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
   novedad=[]
   conment =""
  url: string;

  constructor(private toastrService: NbToastrService,private service:ServicesService,private windowService: NbWindowService){}
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  ngOnInit() {
    const datos= JSON.parse(localStorage.getItem('data'))
    this.service.getNovedad().subscribe(res=>{
      res.map(item=>{
        let indice =item.fechaSolicitud.indexOf("T");
      let extraida = item.fechaSolicitud.substring(1, indice);
      item.fechaSolicitud=extraida
      if (item.comentario.length === 0){
        item.comentario ="Tu solicitud a un no tiene Respuesta"
      }else{
        item.comentario = item.comentario
      }
      })
      this.novedad=res.filter(res=> res.aprendizNovedad ===datos.id)
    })
    } 

  
    
    user():any{
      let  datos= JSON.parse(localStorage.getItem('data'))
      console.log(datos)
      let  data:string = datos.nombresUsuario+" "+datos.apellidosUsuario;
      let users: { usu: { name: string; }; }
      return users = { usu:{name:data} };
    }

    openWindow() {    
      this.windowService.open(
        this.contentTemplate,
        { title: 'Archivo'}
      );
      }
      archivo(data:any){
        //let  l =  data.substring(13)
    this.url = `https://back-end-novost.herokuapp.com${data}`
    let df:any=document.getElementById("ob")
      df.setAttribute('src',this.url)
      }
}
