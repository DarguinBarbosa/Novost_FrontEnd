import { ServiceService } from './service.service';
import { Component, HostBinding, HostListener, OnInit, TemplateRef } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import swal from'sweetalert2'
import { NbDialogService } from '@nebular/theme';
import { min } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostListener("window:scroll",[],)
  @HostListener("window:load",[],)
  modal!:NgbModalRef;
  counter:number =0
  counter2:number =0
  counter3:number =0
  dialog!:NgbModalRef
  counter4:number =0
  email :any
  form :FormGroup;
  showPassword = false;
  constructor(private dialogService: NbDialogService,public sanitizer: DomSanitizer,private modalService:NgbModal, private fb:FormBuilder, 
              private service: ServiceService,private router:Router, ) { 
    this.form = this.fb.group({
        documento:['', Validators.compose([Validators.required,Validators.pattern(/^[0-9]{7,12}$/)])],
        password:['', Validators.compose([Validators.required,Validators.maxLength(16),Validators.minLength(8)])]
    })

  }
  
  
  ngOnInit(): void {

  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }
  getErrortipo():any{
    if (this.form.get('documento').hasError('required') ) {
      return '*';
   }
  }
  getErrorfinApa():any{
    if (this.form.get('password').hasError('required') ) {
      return '*';
   }
  }

  OpenPassword(dialog:any){
    this.close()
    this.dialog=this.modalService.open(dialog,{centered:true , backdropClass:'is-open'}) 
  }
  closeVmM2(){
    this.dialog.close()
  }
  verificar(data: any){
    console.log(data.documento)
    const datalogin:any ={
      username:this.form.value.documento,
      password:this.form.value.password
    }
    if(this.form.valid){
   this.service.validar(datalogin).subscribe(res=>{
     //Usuarios correctos
     this.router.navigate(['pages/dashboard'])
     this.close()
   },
   error=>{
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario o contraseña incorrecta',
    })
   })
  }
  }
  
  recuperarPas(email:any){
      this.service.restPass(email).subscribe(res=>{
        this.closeVmM2()
        swal.fire({
          icon: 'info',
          title: `Hola, ${res.nombre}`,
          text: `${res.message}`,
        })
        this.email=''
      },error=>{
        console.log(error)
        swal.fire({
          icon: 'info',
          title: 'Hola...',
          text: `No encontramos tu correo, por favor comunicate con el administrador`,
        })
      })
    
  }
  mobile(){
  document.querySelector('#navbar')?.classList.toggle('navbar-mobile')

  let  p:any= document.querySelector('#navbar i')
    p.classList.toggle('bi-list')
      p.classList.toggle('bi-x')
      
  }
  open(content:any){
    this.modal=this.modalService.open(content,{centered:true , backdropClass:'is-open'})
    var m:any = document.querySelector("#modal")
    m.classList.add('is-open')
  }
  close(){
    this.modal.close()
  }

counterStop:any=setInterval(()=>{
  this.counter++
  if(this.counter ==1000){
    clearInterval(this.counterStop)
  }
},6)

counterStop2:any=setInterval(()=>{
  this.counter2++
  if(this.counter2 ==20){
    clearInterval(this.counterStop2)
  }
},30)

counterStop3:any=setInterval(()=>{
  this.counter3++
  if(this.counter3 ==10){
    clearInterval(this.counterStop3)
  }
},1000)

counterstop4:any=setInterval(()=>{
  this.counter4++
  if(this.counter4 ==200){
    clearInterval(this.counterstop4)
  }
},100)

/*Estilos en angular  */
  allscroll($event:any){
    let navbar:any = document.querySelector('#navbar')
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile')
      let navbarToggle:any = document.querySelector('.mobile-nav-toggle')
      navbarToggle.classList.toggle('bi-list')
      navbarToggle.classList.toggle('bi-x')
    }
    let scrolloffset =$event.srcElement.children[0].scrollTop;
    let selectHeader:any = document.querySelector('#header')
    if (selectHeader) {
      let headerOffset = selectHeader.offsetTop
      let nextElement = selectHeader.nextElementSibling
        if ((headerOffset - scrolloffset) <= 0) {
          selectHeader.classList.add('fixed-top')
          nextElement.classList.add('scrolled-offset')
        } else {
          selectHeader.classList.remove('fixed-top')
          nextElement.classList.remove('scrolled-offset')
        }
    }
    let btn:any = document.querySelector('#btni')// llamo a un id
    if (btn){
      if ((scrolloffset) > 300) {
        btn.classList.add('active')
          }else {
            btn.classList.remove('active')
              }
    }
    let navbarlinks:any= document.querySelectorAll('#navbar .scrollto')
      let position = scrolloffset + 200
      navbarlinks.forEach((navbarlink:any) => {
        if (!navbarlink.hash) return
        let section = document.querySelector(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    console.log("window:scroll",scrolloffset)
  }

 
  
}
