import { Route, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'carga-lista',
  templateUrl: './carga-lista.component.html',
  styleUrls: ['./carga-lista.component.scss']
})
export class CargaListaComponent implements OnInit {
  linearMode = true;
  form :FormGroup;
  form2 :FormGroup; 
  value:any
  numFicha:any
  idFicha:any
  constructor(private toastrService: NbToastrService,private route:Router,private fb:FormBuilder,private cd:ChangeDetectorRef,private service :ServiceService) { 
    let fecha: Date = new Date();
    this.value=fecha
    this.form=this.fb.group({
      id:[],
      NombreCentro:['',Validators.required],
      NombreCoordinacion:['',Validators.required],
      NombrePrograma:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/),Validators.minLength(4),Validators.maxLength(50) ])],
      VersionPrograma: ['',Validators.compose([Validators.pattern(/^[0-9]{3,7}$/),Validators.required])],
      numeroFicha:['',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])],
      anio:[this.value],
      trimestre:['',Validators.compose([Validators.pattern(/^[0-9]{1,2}$/),Validators.required ,Validators.min(1), Validators.max(6)])],
      CantidadAprendices:['',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{2}$/),Validators.min(15), Validators.max(35)])],
    })

    
    this.form2=this.fb.group({
      id:[],
      lista:['',Validators.required ],
      ficha:[this.form.value.numeroFicha],
     
    })
  }
  

  ngOnInit(): void {
  }


 AgregarFicha(){
   if(this.form.valid){
 let fecha: Date = new Date();
 console.log(fecha.toLocaleDateString())
 const formData = new FormData();
formData.append('id',this.form.value.id)
formData.append('NombreCentro',this.form.value.NombreCentro)
formData.append('NombreCoordinacion',this.form.value.NombreCoordinacion)
formData.append('NombrePrograma',this.form.value.NombrePrograma)
formData.append('VersionPrograma',`V${this.form.value.VersionPrograma}`)
formData.append('numeroFicha',this.form.value.numeroFicha)
formData.append('anio','2021')
formData.append('trimestre',this.form.value.trimestre)
formData.append('cantidadAprendices',this.form.value.CantidadAprendices)
  this.service.AgregarFicha(formData).subscribe(res=>{
   return  this.idFicha = res.idFicha
  })
}else{
  console.log(this.form.invalid)
}
 }
 
 listado(){  
  if(this.form.valid){
    let fecha: Date = new Date();
    console.log(fecha.toLocaleDateString())
    const formData = new FormData();
    formData.append('id',this.form.value.id)
    formData.append('nombreCentro',this.form.value.NombreCentro)
    formData.append('nombreCoordinacion',this.form.value.NombreCoordinacion)
    formData.append('nombrePrograma',this.form.value.NombrePrograma)
    formData.append('versionPrograma',`V${this.form.value.VersionPrograma}`)
    formData.append('numeroFicha',this.form.value.numeroFicha)
    formData.append('anio','2021')
    formData.append('trimestre',this.form.value.trimestre)
    formData.append('cantidadAprendices',this.form.value.CantidadAprendices)
     this.service.AgregarFicha(formData).subscribe(res=>{
        this.idFicha = res.idFicha
        console.log(res)
        console.log(res.idFicha)
      if(this.form2.valid){
        const formData2 = new FormData();
      formData2.append('file',this.form2.value.lista)
      formData2.append('fichaAprendiz',this.idFicha )
      formData2.append('rolUsuario','AP')
      this.service.cargarFicha(formData2).subscribe(res=>{
      })
        }else{
          console.log('Formulario no es valido')
        }
     })
   }else{
     console.log(this.form.invalid)
   }
}
  recarga(event:any){
    console.log('Archivo')
    let reader =new FileReader()
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      reader.readAsDataURL(file)
      reader.onload=()=>{
      
        this.form2.patchValue({
          lista:event.target.files[0]
        })
        this.cd.markForCheck()
      }
    }
  }
   
  navigate(){
    this.route.navigate(['/pages/user/usuario'])
  }
  validateArchive(){
    var arcInput:any = document.getElementById('file')
    var extPermitidas=/(.xls)|(.xlsx)$/i
    if(!extPermitidas.exec(arcInput.value)){
     this.toastrService.show('Solo se puede subir excel','Acta',{status:'danger'})
     arcInput.value=''
     return false
    }
}
  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
/* -------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------------------------------
 ----------------------Mensaje de Errores sobre las  validaciones ----------------------------------
 ---------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------------------------------
 */
getError(){
 if(this.form.get('numeroFicha').hasError('pattern')){
   return '* solo se puede ingresar Max 15 y como Min 6 caracteres'
 }else if(this.form.get('numeroFicha').hasError('required')){
  return ' *'
}
}
getErrorTrimes(){
 if(this.form.get('trimestre').hasError('pattern')){
   return '* solo se puede ingresar Max 2 y como Min 1 Caracteres'
 }else if(this.form.get('trimestre').hasError('min')){
  return '* Debe llevar 1 trimestre como minimo'
}else if(this.form.get('trimestre').hasError('max')){
  return '* Maximo la ficha debe estar en 6 trimestre'
}else if(this.form.get('trimestre').hasError('required')){
  return ' *'
}
}

getErrorCanApe(){
 if(this.form.get('CantidadAprendices').hasError('pattern')){
   return '* solo se puede ingresar 2 Caracteres'
 }else if(this.form.get('CantidadAprendices').hasError('min')){
  return '* La ficha debe de tener 15 aprendices como minimo '
}else if(this.form.get('CantidadAprendices').hasError('max')){
  return '* Solo puede tener 35 aprendices como minimo '
}else if(this.form.get('CantidadAprendices').hasError('required')){
  return '*'
}
}

getErrorArchLis(){
 if(this.form2.get('lista').hasError('required')){
   return '*'
 }
 }
 getErrorCentro(){
  if(this.form.get('NombreCentro').hasError('required')){
    return '*'
  }
  }
  getErrorCoor(){
    if(this.form.get('NombreCoordinacion').hasError('required')){
      return '*'
    }
  }
  getErrorfinApa():any{
    if (this.form.get('NombrePrograma').hasError('required') ) {
      return '*';
   }else if(this.form.get('NombrePrograma').hasError('maxlength')){
    return '* Solo se permiten 50 caracteres';
   }
   else if(this.form.get('NombrePrograma').hasError('pattern')){
    return '* Solo se permiten letras';
   }
   else if(this.form.get('NombrePrograma').hasError('minlength')){
    return '* Solo se permiten como minimo 4 caracteres';
   }
  }

  getErrorVersion(){
    if(this.form.get('VersionPrograma').hasError('pattern')){
      return '* solo se puede ingresar Max 7  y como Min 3 Caracteres'
    }else if(this.form.get('VersionPrograma').hasError('required')){
     return ' *'
   }
   }
}