import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FichaComponent } from '../ficha/ficha.component';
import { ServicesService } from '../services/services.service';
import swal from'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'cancelacion',
  templateUrl: './cancelacion.component.html',
  styleUrls: ['./cancelacion.component.scss']
})
export class CancelacionComponent implements OnInit {
  value:any
  form:FormGroup
  arrApe:any
  aprendiz: string;

  constructor(private route:Router,private toastrService: NbToastrService,private fb:FormBuilder,private cd:ChangeDetectorRef,private dialogService: NbDialogService,private service:ServicesService) { 
    this.aprendiz='Selecciona un aprendiz'
    let fecha: Date = new Date();
    this.value=fecha
    const datos= JSON.parse(localStorage.getItem('data'))
     this.form=this.fb.group({
       id:[],
       acta:['',Validators.required],
       fechaSolicitud:[this.value],
       aprendizNovedad:[datos.id],
       estadoNovedad:['solicitud'],
       tipoNovedad:['', Validators.required],
       DescripcionNovedad:['',Validators.compose([Validators.pattern(/^[a-zA-Z ]+$/),Validators.minLength(4),Validators.maxLength(100) ])]
     })
   }
  

  ngOnInit(): void {
  }

  open() {
    this.dialogService.open(FichaComponent ,{context:{title:'1'}})
      .onClose.subscribe(res =>{
          this.aprendiz=`${res.nombresUsuario} ${res.apellidosUsuario}`,
        this.arrApe = res
      });

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

  verificar(data: any){
    let tipo:any
    if (this.form.value.tipoNovedad == 6){
        tipo ='Cancelacion por convivencia'
    }else{ tipo ='Cancelacion Academica'}
    swal.fire({
      title: '<strong>Confirma los datos del Aprendiz</strong>',
      icon: 'info',
      html:
        `<ul>
        <li> Aprendiz <strong> ${this.arrApe.nombresUsuario} ${this.arrApe.apellidosUsuario}</strong></li>
        <li>correo<strong> ${this.arrApe.email}</strong></li>
        <li>Numero de documento <strong> ${this.arrApe.numeroDocumentoUsuario}</strong></li>
        <li>Estas realizando una <strong> ${tipo}</strong></li>
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
        formData.append('id', this.form.value.id)
        formData.append('acta', this.form.value.acta)
        formData.append('estadoNovedad', this.form.value.estadoNovedad)
        formData.append('fechaSolicitud',JSON.stringify(this.form.value.fechaSolicitud) )
        formData.append('aprendizNovedad',this.arrApe.id)
        formData.append('tipoNovedad', this.form.value.tipoNovedad)
        formData.append('duracionA', '6')
        formData.append('DescripcionNovedad',this.form.value.DescripcionNovedad)

       this.service.retiroVo(formData).subscribe(res=>{
        swal.fire('Solicitud enviada!', '', 'success')
        this.route.navigate(['../solicitudes'])
      },
       error=>{
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:`${error.message}`
        })
       })
      } else if (result.isDenied) {
        swal.fire('Changes are not saved', '', 'info')
      }
    })
   
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
  /* -------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------------------------------
 ----------------------Mensaje de Errores sobre las  validaciones ----------------------------------
 ---------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------------------------------
 */
getError(){
  if(this.form.get('acta').hasError('required')){
   return ' *'
 }
 }
 getErrorTipoNove(){
  if(this.form.get('tipoNovedad').hasError('required')){
   return ' *'
 }
 }
 
 getErrorCanApe(){
  if(this.form.get('DescripcionNovedad').hasError('pattern')){
    return '* Este campo solo permite letras'
  }else if(this.form.get('DescripcionNovedad').hasError('minlength')){
   return '* Este campo solo permite 4 caracteres como minimo '
 }else if(this.form.get('DescripcionNovedad').hasError('maxlength')){
   return '* Este campo solo permite maximo 100 caracteres '
 }
 }
 
}
