import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services/services.service';
import { OneColumnLayoutComponent } from 'app/@theme/layouts';

import swal from'sweetalert2'
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
@Component({
  selector: 'aplazamiento',
  templateUrl: './aplazamiento.component.html',
  styleUrls: ['./aplazamiento.component.scss']
})
export class AplazamientoComponent implements OnInit {
 
  secondFormGroup!:FormGroup;
  value: any;
  secondCtrl:any = []= [
    'incapacidad médica','licencia de maternidad','servicio militar','problemas de seguridad','calamidad doméstica'
  ]
  constructor( private route:Router,private _formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private service:ServicesService,private cd:ChangeDetectorRef,
    private co:OneColumnLayoutComponent,) { 
    let fecha: any  = new Date();
    const datos= JSON.parse(localStorage.getItem('data'))
    this.value=fecha
    console.log(this.value)
    this.secondFormGroup = this._formBuilder.group({
      id: [''],
      fechaSolicitud:[this.value],
      acta: ['', Validators.required],
      inicio: [ this.value],
      estadoNovedad:['solicitud'],
      aprendizNovedad:[datos.id],
      tipoNovedad:['Aplazamiento'],
      finApa: ['', Validators.compose([Validators.required,Validators.max(6),Validators.min(1)])],
      causa: ['',Validators.required],
    }); 
  }

  ngOnInit(): void {
  }

  capturar(){
    var inputValue = parseFloat((<HTMLInputElement>document.getElementById("number")).value);
    let date: Date = new Date();
    let t = date.setMonth(date.getMonth()+inputValue)
    // console.log(date.toLocaleDateString())
  }

  getErrortipo():any{
    if (this.secondFormGroup.get('acta').hasError('required') ) {
      return '*';
   }
  }
  getErrorcausa():any{
    if (this.secondFormGroup.get('causa').hasError('required') ) {
      return '*';
   }
  }
  getErrorfinApa():any{
    if (this.secondFormGroup.get('finApa').hasError('required') ) {
      return '*';
   }else if(this.secondFormGroup.get('finApa').hasError('max')){
    return '* Solo se puede aplazar 6 meses';
   }
   else if(this.secondFormGroup.get('finApa').hasError('min')){
    return '* Solo se puede aplazar 1 mes como minimo';
   }
  }
  verificar(data: any){
    const datos= JSON.parse(localStorage.getItem('data'))
    swal.fire({
      title: '<strong>Confirma tus Datos</strong>',
      icon: 'info',
      html:
        `<ul>
        <li>Tu eres <strong> ${datos.nombresUsuario} ${datos.apellidosUsuario}</strong></li>
        <li>Este es tu correo<strong> ${datos.email}</strong></li>
        <li>y este es tu Numero de documento <strong> ${datos.numeroDocumentoUsuario}</strong></li>
        <li>vas a solicitar un  <strong> ${this.secondFormGroup.value.tipoNovedad}</strong></li>
        </ul>
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
        const formData = new FormData();
        formData.append('id', this.secondFormGroup.value.id)
        formData.append('acta', this.secondFormGroup.value.acta)
        formData.append('estadoNovedad', this.secondFormGroup.value.estadoNovedad)
        formData.append('fechaSolicitud',JSON.stringify(this.secondFormGroup.value.fechaSolicitud) )
        formData.append('aprendizNovedad',this.secondFormGroup.value.aprendizNovedad)
        formData.append('tipoNovedad', '2')
        formData.append('fechaInicio',this.secondFormGroup.value.inicio)
        formData.append('causa',this.secondFormGroup.value.causa)
        formData.append('duracionA',this.secondFormGroup.value.finApa)
       this.service.retiroVo(formData).subscribe(res=>{
        this.co.ngOnInit()
        swal.fire('Solicitud enviada!', '', 'success')
        this.route.navigate(['../dashboard'])
       },
       error=>{
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:`${error}`
        })
       })
      } else if (result.isDenied) {
        swal.fire('Changes are not saved', '', 'info')
      }
    })
   
  }

  recarga(event:any){
    let reader =new FileReader()
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)
      reader.onload=()=>{
      
        this.secondFormGroup.patchValue({
          acta:event.target.files[0]
        })
        this.cd.markForCheck()
      }
    }
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
}
