import { ChatUIComponent } from './chat-ui/chat-ui.component';
import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
  <button *ngIf="rol ==='AP'" nbButton class='boton' (click)="openWindow()" size="giant" status="warning"><nb-icon icon="message-circle-outline"></nb-icon></button>
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet>
      <breadcrumb > </breadcrumb>
      </router-outlet>
  </ngx-one-column-layout>
  `,
})
export class PagesComponent 
{
   rol:any ;
  constructor(private windowService: NbWindowService) {
    let  datos= JSON.parse(localStorage.getItem('data'))
   this.rol= datos.rolUsuario
    
  }
  openWindow() {
    this.windowService.open(ChatUIComponent, { title:'Bot Novost'});
  }
  menu = MENU_ITEMS;
}
