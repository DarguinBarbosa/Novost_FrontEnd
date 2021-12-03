import { filter } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ServicesService } from '../services/services.service';
import swal from'sweetalert2'
@Component({
  selector: 'cambio-ficha',
  templateUrl: './cambio-ficha.component.html',
  styleUrls: ['./cambio-ficha.component.scss']
})
export class CambioFichaComponent implements OnInit {
  idFicha:any

  constructor(private route:Router,private toastrService: NbToastrService,private fb:FormBuilder,private cd:ChangeDetectorRef,private dialogService: NbDialogService,private service:ServicesService) { }
  tableSettings = {
    noDataMessage:'No se han encontrado datos',
   actions:{
     add:false,
     edit:false,
     delete:false,
     custom:[{name:'asig',
     title:`Solicitar Traslado`
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
      },
      nombrePrograma:{
        title: 'Programa',
        filter: false,
      },
      nombreCoordinacion:{
        title: 'Coordinacion',
        filter: false,
      },
      nombreCentro:{
        title: 'Centro ',
        filter: false,
      }
     
    }
  };
tabledata=[]
form!:FormGroup
programa=''
ficha=''
trimestre=''
centro=''
value:any
  ngOnInit(): void {
    let fecha: any  = new Date();
    const datos= JSON.parse(localStorage.getItem('data'))
    this.value=fecha
    console.log(this.value)
this.form= this.fb.group({
  acta:['',Validators.required],
  CFicha:['',Validators.required],
  fechaSolicitud:[this.value],
  aprendizNovedad:[datos.id],
  tipoNovedad:['',Validators.required],
})
      
}

  
open(dialog: TemplateRef<any>) {
  const datos= JSON.parse(localStorage.getItem('data')) 
  datos.id
  this.service.ficha().subscribe(list=>{
  this.dialogService.open(dialog);
  this.service.getApe().subscribe(res=>{
    let tabla2 = res.filter(res=>res.id == datos.id)
    console.log(list)
    console.log(tabla2)
    if (this.form.value.tipoNovedad == '6') {
      this.tabledata = list.filter(list=> list.idFicha != tabla2[0]['fichaAprendiz'] &&
      list.nombrePrograma == tabla2[0]['nombrePrograma'] &&
      list.nombreCentro == tabla2[0]['nombreCentro'] &&
      list.nombreCoordinacion == tabla2[0]['nombreCoordinacion'] &&
      list.trimestre == tabla2[0]['trimestre'] )
    }else if(this.form.value.tipoNovedad == '7'){
      this.tabledata = list.filter(list=> list.idFicha != tabla2[0]['fichaAprendiz'] )
    }

  })    
})
}
 

evento(event:any){
  this.ficha = event.data.numeroFicha
  this.centro = event.data.nombreCentro
  this.programa = event.data.nombrePrograma
  this.trimestre = event.data.trimestre  
  this.idFicha= event.data.idFicha
}


validateArchive(){
  console.log('Estas llamando a un archvo ')
  var arcInput:any = document.getElementById('file')
  var extPermitidas=/(.pdf)$/i
  if(!extPermitidas.exec(arcInput.value)){
   this.toastrService.show('Solo se puede subir PDF','Acta',{status:'danger'})
   arcInput.value=''
   return false
  }
}
recarga(event:any){
  let reader =new FileReader()
  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files
    reader.readAsDataURL(file)
    reader.onload=()=>{
    
      this.form.patchValue({
        acta:event.target.files[0]
      })
      this.cd.markForCheck()
    }
  }
}

guardar(){
  const datos= JSON.parse(localStorage.getItem('data'))
    swal.fire({
      title: '<strong>Confirma tus Datos</strong>',
      icon: 'info',
      html:
        `<p>
        Tu eres <strong> ${datos.nombresUsuario} ${datos.apellidosUsuario}</strong>,
        Este es tu correo<strong> ${datos.email}</strong>,
         tu Numero de documento <strong> ${datos.numeroDocumentoUsuario}</strong>
        </strong>
        </p>
        `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        ' Si!',
      cancelButtonText:
        'No',
    }).then((result) =>{
    if (result.isConfirmed) {
      if (this.form.valid) {
        const formData = new FormData()
        formData.append('acta', this.form.value.acta)
        formData.append('estadoNovedad', 'solicitud')
        formData.append('fechaSolicitud',JSON.stringify(this.form.value.fechaSolicitud)) 
        formData.append('aprendizNovedad',this.form.value.aprendizNovedad)
        formData.append('tipoNovedad', this.form.value.tipoNovedad)
        formData.append('fichaAspirante', this.idFicha)
        this.service.retiroVo(formData).subscribe(res=>{
      swal.fire('Solicitud enviada!', '', 'success')
          this.route.navigate(['/dashboard'])
        },error=>{
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:`${error}`
          })
         })}
    } else if (result.isDenied) {
      swal.fire('Changes are not saved', '', 'info')
    }
  })

} 






}
