import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services/services.service';
import swal from'sweetalert2'
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'retiro-voluntario',
  templateUrl: './retiro-voluntario.component.html',
  styleUrls: ['./retiro-voluntario.component.scss']
})
export class RetiroVoluntarioComponent implements OnInit {
  form :FormGroup;
 value:any
 nameBu:any
  constructor(private toastrService: NbToastrService,private fb:FormBuilder, private service:ServicesService, private route:Router,private cd:ChangeDetectorRef,private activaRoute:ActivatedRoute ) { 
     let fecha: Date = new Date();
   this.value=fecha
   const datos= JSON.parse(localStorage.getItem('data'))
    this.form=this.fb.group({
      id:[],
      acta:['',Validators.required],
      fechaSolicitud:[this.value],
      aprendizNovedad:[datos.id],
      estadoNovedad:['solicitud'],
      tipoNovedad:['Retiro Voluntario '],
      DescripcionNovedad:['',Validators.compose([Validators.pattern(/^[a-zA-Z ]+$/),Validators.minLength(4),Validators.maxLength(100) ])]
    })
  }

  ngOnInit(): void {
      this.activaRoute.params.subscribe(e=>{
       if (e.id) {
         this.service.verificarNove(e.id).subscribe(res=>{
            console.log(res)
            this.form.setValue({
              'id':res[0].id,
              'acta':res[0].acta,
              'fechaSolicitud':res[0].fechaSolicitud,
              'aprendizNovedad':res[0].aprendizNovedad,
              'DescripcionNovedad':res[0].DescripcionNovedad,
              'estadoNovedad':res[0].estadoNovedad,
              'tipoNovedad':'Retiro Voluntario'
            })
         })
    this.nameBu="Actulizar"
       }else{
        this.nameBu="Enviar"
       }
    })
  }
  getErroracta():any{
    if (this.form.get('acta').hasError('required') ) {
      return '*';
   }
  }

  getErrordescripcion():any{
    if (this.form.get('DescripcionNovedad').hasError('pattern') ) {
      return 'Este campo solo permite letras';
   }else if(this.form.get('DescripcionNovedad').hasError('max')){
    return 'Solo se permiten 100 caracteres';
   }
   else if(this.form.get('DescripcionNovedad').hasError('min')){
    return 'Solo se permiten como minimo 4 caracteres';
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
        <li>vas a solicitar un  <strong> ${this.form.value.tipoNovedad}</strong></li>
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
        formData.append('estadoNovedad','solicitud')
        formData.append('fechaSolicitud',this.form.value.fechaSolicitud)
        formData.append('aprendizNovedad',this.form.value.aprendizNovedad,)
        formData.append('tipoNovedad', '3')
        formData.append('comentario', '')
        formData.append('DescripcionNovedad', this.form.value.DescripcionNovedad)
      if(this.form.value.id > 0){
        this.service.updateNove(formData).subscribe(res=>{
          console.log(res)
          this.route.navigate(['../dashboard'])
        })
      }else{
      formData.append('acta', this.form.value.acta)
      formData.append('comentario', '')
      formData.set('fechaSolicitud',JSON.stringify(this.form.value.fechaSolicitud))
       this.service.retiroVo(formData).subscribe(res=>{
        swal.fire('Saved!', '', 'success')
        this.route.navigate(['../dashboard'])
        this.ngOnInit()
       },
       error=>{
         console.log(error)
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:`${error.message}`
        })
       })}
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
      
        this.form.patchValue({
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
