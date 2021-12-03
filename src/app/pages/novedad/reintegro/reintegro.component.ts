import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services/services.service';
import swal from'sweetalert2'
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { OneColumnLayoutComponent } from 'app/@theme/layouts';

@Component({
  selector: 'reintegro',
  templateUrl: './reintegro.component.html',
  styleUrls: ['./reintegro.component.scss']
})
export class ReintegroComponent implements OnInit {
  secondFormGroup!:FormGroup
  value:any
  constructor(private co:OneColumnLayoutComponent,private route:Router,private _formBuilder: FormBuilder,private toastrService: NbToastrService,  private service:ServicesService,private cd:ChangeDetectorRef) { 
    let fecha: Date = new Date();
    this.value=fecha
    const datos= JSON.parse(localStorage.getItem('data')) 
    this.secondFormGroup = this._formBuilder.group({
      id:[],
      fechaSolicitud:[this.value],
      aprendizNovedad:[datos.id],
      estadoNovedad:['solicitud'],
      tipoNovedad:['Reintegro'],
      acta: ['', Validators.required],
      causa: ['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/),Validators.minLength(4),Validators.maxLength(50) ])],
      DescripcionNovedad: ['', Validators.compose([Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/),Validators.minLength(4),Validators.maxLength(100) ])],
    });
  }
 

  ngOnInit(): void {
  }

  getErrortipo():any{
    if (this.secondFormGroup.get('acta').hasError('required') ) {
      return '*';
   }
  }
  getErrorfinApa():any{
    if (this.secondFormGroup.get('causa').hasError('required') ) {
      return '*';
   }else if(this.secondFormGroup.get('causa').hasError('maxlength')){
    return '* Solo se permiten 50 caracteres';
   }
   else if(this.secondFormGroup.get('causa').hasError('minlength')){
    return '* Solo se permiten como minimo 4 caracteres';
   }
  }
  getErrorDescripcionNovedad():any{
    if (this.secondFormGroup.get('DescripcionNovedad').hasError('required') ) {
      return '*';
   }else if(this.secondFormGroup.get('DescripcionNovedad').hasError('maxlength')){
    return '* Solo se permiten 100 caracteres';
   }
   else if(this.secondFormGroup.get('DescripcionNovedad').hasError('minlength')){
    return '* Solo se permiten como minimo 4 caracteres';
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
        formData.append('tipoNovedad', '4')
        formData.append('DescripcionNovedad',this.secondFormGroup.value.DescripcionNovedad)
        formData.append('causa',this.secondFormGroup.value.causa)
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
    var arcInput:any = document.getElementById('file')
    var extPermitidas=/(.pdf)$/i
    if(!extPermitidas.exec(arcInput.value)){
     this.toastrService.show('Solo se puede subir PDF','Acta',{status:'danger'})
     arcInput.value=''
     return false
    }
}
}
