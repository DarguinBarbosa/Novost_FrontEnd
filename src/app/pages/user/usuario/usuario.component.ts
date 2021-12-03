import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { map } from 'rxjs/operators';
import { ServiceService } from '../service/service.service';
import swal from'sweetalert2'

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  Settings = {
    noDataMessage:'Usuario no enccontrados',
    actions:{
      add:false,
      edit:false,
      delete:false,
     hideSubHeader:true,
    },
      columns: {
        id: {
          hide:true
        },
        nombresUsuario: {
          title: 'Nombre',
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
        rolUsuario: {
          title: 'Rol',
          filter: true,
        },
        tipoDocumentoUsuario: {
          title: ' Tipo Documento',
          filter: true,
        },
      }
    };
    datos:[]
    info:any
    info2:any
    activate = false
  form :FormGroup;
  form2 :FormGroup;
  showPassword = true;
  boton = false;
  selectFicha:any
  constructor(private fb:FormBuilder, private service :ServiceService, private router:Router) { 
   
    this.form=this.fb.group({
      id:[],
      nombre:['',Validators.compose([Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/),Validators.required,Validators.minLength(4), Validators.maxLength(30)])],
      apellido:['',Validators.compose([Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/),Validators.required,Validators.minLength(5), Validators.maxLength(40)])],
      rol:['',Validators.required],
      Ndocumento:['',Validators.compose([Validators.pattern(/^[0-9]{7,10}$/),Validators.required])],
      email:['',Validators.compose([Validators.email,Validators.required]),],
      // pass:['',Validators.compose([Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/),Validators.minLength(8),Validators.maxLength(16) ])],
      // // asyncValidators:[ gmail(this.service)],
      // // updateOn:'blur'
    })
   
  }


  ngOnInit(): void {
    this.service.getUser().subscribe(res=>{  
      res.map(item =>{
        item.nombresUsuario = `${item.nombresUsuario} ${item.apellidosUsuario} `
      })
      console.log(res)
      this.datos= res
      let data=this.datos
      this.info = new LocalDataSource(data);
    })
  }
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

 
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
   agregar(){
    const datausus:any ={
      nombresUsuario:this.form.value.nombre,
      apellidosUsuario:this.form.value.apellido,
      rolUsuario:this.form.value.rol,
      numeroDocumentoUsuario:this.form.value.Ndocumento,
      email:this.form.value.email,
      password:this.form.value.Ndocumento
    }
    this.service.createUser(datausus).subscribe(res=>{
      this.ctemplate()   
      this.ngOnInit()
    },error=>{
      console.log(error)
    })
   }

   agregarApe(){
    const datausus:any ={
      nombresUsuario:this.form.value.nombre,
      apellidosUsuario:this.form.value.apellido,
      rolUsuario:this.form.value.rol,
      numeroDocumentoUsuario:this.form.value.Ndocumento,
      fichaAprendiz:this.form2.value.ficha,
      estadoAprendiz:this.form2.value.estado,
      telefonoAprendiz:this.form2.value.tel,
      email:this.form.value.email,
      password:this.form.value.Ndocumento
    }
    this.service.createApe(datausus).subscribe(res=>{
      console.log(res)
      this.ctemplate()
    },(error:any)=>{
      console.log(error)
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay un error en alguno de los campos llenados'
      })
    })
   }
   apeform(event:any){
      console.log(event)
    if(event === 'AP'){
      this.activate =true
      this.service.getFicha().subscribe(res=>{
          this.selectFicha=res
          this.form2=this.fb.group({
            ficha:['',Validators.required],
            estado:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]+$/),Validators.maxLength(30), Validators.minLength(7)])],
            tel:['',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{7,10}$/)])],
          })
      }
      )
    }else{
      this.activate=false
    }
   }
   ctemplate(){
this.boton = !this.boton
}
validacionForm(p:any,l: any){
  console.log(l)
  console.log(p)
if(p.valid && this.activate===false || l === undefined ){
  this.agregar()
}else if(p.valid && l.valid){
  this.agregarApe()
}else{
  console.log('El formulario no es correcto')
}
}

/* -------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------------------------------
 ----------------------Mensaje de Errores sobre las  validaciones ----------------------------------
 ---------------------------------------------------------------------------------------------------
 ---------------------------------------------------------------------------------------------------
 */

getErrorNombre(){

if(this.form.get('nombre').hasError('required')){
  return '*'
}else if(this.form.get('nombre').hasError('pattern')){
  return '* Solo se permiten letras'
}else if(this.form.get('nombre').hasError('minlength')){
  return '* Como minimo debe escribir 4 caracteres'
}else if(this.form.get('nombre').hasError('maxlength')){
  return '* Solo se permite 30 caracteres'
}
} 

getErrorApelli(){
  if(this.form.get('apellido').hasError('required')){
    return '*'
  }else if(this.form.get('apellido').hasError('pattern')){
    return '* Solo se permiten letras'
  }else if(this.form.get('apellido').hasError('minlength')){
    return '* Como minimo debe escribir 5 caracteres'
  }else if(this.form.get('apellido').hasError('maxlength')){
    return '* Solo se permite 40 caracteres'
  }
} 

getErrorRol(){
  if(this.form.get('rol').hasError('required')){
    return '*'
  }
} 

getErrorNdocumento(){
 if(this.form.get('Ndocumento').hasError('required')){
    return '*'
 } else if(this.form.get('Ndocumento').hasError('pattern')){
    return '* Solo se permiten Max 10 y Min 7 caracteres'
  }
} 

getErroremail(){
  if(this.form.get('email').hasError('required')){
    return '*'
 }else if(this.form.get('email').hasError('email')){
    return 'Escriba un correo valido'
 }
} 
getErrorFicha(){
  if(this.form2.get('ficha').hasError('required')){
    return '*'
 }
}

getErrorEstado(){
  if(this.form2.get('estado').hasError('required')){
    return '*'
 }else  if(this.form2.get('estado').hasError('pattern')){
  return '* Solo se permiten letras'
}else  if(this.form2.get('estado').hasError('maxlength')){
  return '* Solo se permite maximo 30 caracteres'
}else  if(this.form2.get('estado').hasError('minlength')){
  return '* Solo se permite minimo 7 caracteres'
}
}
getErrorCel(){
  if(this.form2.get('tel').hasError('required')){
    return '*'
 }else  if(this.form2.get('tel').hasError('pattern')){
  return '* Solo se permiten Max 10 y Min 7'
}
}

}
export function gmail(api:any):AsyncValidatorFn{
  return(control:AbstractControl)=>{
    return api.email(control.value)
    .pipe(
      map( ({result})=>(result)?{correoExists:true}:null)
      );
  }
}
