import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import {MustMatch} from './validacion'
import { NbDialogRef } from '@nebular/theme';
import swal from'sweetalert2'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'actu-user',
  templateUrl: './actu-user.component.html',
  styleUrls: ['./actu-user.component.scss']
})  
export class ActuUserComponent implements OnInit {
  form:FormGroup
  user:any
  showPassword = false;
  nameUsu:string
  constructor(  private cookie:CookieService,private route:Router,protected dialogRef: NbDialogRef<any>,private fb:FormBuilder,private service:ServiceService) { 
    this.form = this.fb.group({
      id:[''],
      nombreUsuario:[''],
      apellidoUsuario:[''],
      numeroDocumentoUsuario:[''],
      rolusuario:[''],
      tipoDocumentoUsuario:[''],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['', Validators.compose([Validators.required,Validators.maxLength(16),Validators.minLength(8)
        ,Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/)])],
      repeatpassword:['',[Validators.required]],
    },{
      validator: MustMatch('password','repeatpassword')
    });
 console.log()
  }

  get formGet(){
    return this.form.controls
  }

  ngOnInit(): void {
    let  datos= JSON.parse(localStorage.getItem('data'))
    this.service.getUserid(datos.id).subscribe(res=>{
      this.user= res.rolUsuario
      if(this.user ==='AA'){
       this.user ='Apoyo Administrativo'
       }else if(this.user ==='AP'){
       this.user ='Aprendiz'
       }else if(this.user ==='IN'){
        this.user ='Instructor'
        }else if(this.user ==='AD'){
          this.user ='Administrador'
          }
          else if(this.user ==='CO'){
            this.user ='Coordinador'
            }
      this.nameUsu =res.nombresUsuario
      this.form.setValue({
        id:res.id,
        nombreUsuario:res.nombresUsuario,
        apellidoUsuario:res.apellidosUsuario,
        numeroDocumentoUsuario:res.numeroDocumentoUsuario,
        rolusuario:res.rolUsuario,
        tipoDocumentoUsuario:res.tipoDocumentoUsuario,
        email:res.email,
        password:'',
        repeatpassword:''
      })
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
  
  close(){
      this.dialogRef.close()
    }

    actu(){
      const datos={ 
        id:this.form.value.id,
        nombreUsuario:this.form.value.nombreUsuario,
        apellidoUsuario:this.form.value.apellidoUsuario,
        numeroDocumentoUsuario:this.form.value.numeroDocumentoUsuario,
        rolUsuario:this.form.value.rolusuario,
        tipoDocumentoUsuario:this.form.value.tipoDocumentoUsuario,
        email:this.form.value.email,
        password:this.form.value.password
      }
      console.log(datos)
      this.service.updateUser(datos.id,datos).subscribe(res=>{
        swal.fire('Se han actualizado los datos !', '', 'success')
              this.dialogRef.close()
              this.cerrarSession()
      })
      
    }

    cerrarSession(){
      let token = this.cookie.get('token')
        this.service.cerrarSesion(token)
        this.cookie.delete('token','/');
        localStorage.removeItem('data')
        this.route.navigate(['/login']).then(()=>
        window.location.reload());
        this.ngOnInit()
      }




      getErrorPass(){
        if(this.form.get('password').hasError('required')){
          return '*'
        }else if(this.form.get('password').hasError('maxlength')){
          return '* Solo puede ingresar 16 caracteres como maximo'
        }else if(this.form.get('password').hasError('minlength')){
          return '* Solo puede ingresar minimo 8 caracteres'
        }else if(this.form.get('password').hasError('pattern')){
          return '*Solo puede ingresar numeros, letras y caracteres especiales'
        }
      }
      getErrorEmail(){
        if(this.form.get('email').hasError('required')){
          return '*'
        }else if(this.form.get('email').hasError('email')){
          return '* Escriba un correo valido'
        }
      }
}


