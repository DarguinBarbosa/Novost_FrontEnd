import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit {
  form :FormGroup;
  constructor(private fb:FormBuilder,private location: Location,private ref: NbDialogRef<DocumentoComponent>) { 
    this.form=this.fb.group({
      name:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z ]+$/),Validators.minLength(4),Validators.maxLength(100) ])]
    })
  }
  goBack() {
    this.ref.close();
  }
  ngOnInit(): void {
  }
  submit(value:string) {
    this.ref.close(value)
  }

}
