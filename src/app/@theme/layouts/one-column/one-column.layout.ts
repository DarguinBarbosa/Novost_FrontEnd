import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RolGuard } from 'app/@core/guards/rol.guard';
import {MENU_ITEMS} from '../../../pages/pages-menu'

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive start>
      <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnInit{
  path ="https://back-end-novost.herokuapp.com/novedades/aprendiz/"
  infoApe:any
    constructor(private http:HttpClient){}
  ngOnInit() {
    const datos= JSON.parse(localStorage.getItem('data'))
    console.log(MENU_ITEMS)
    this.http.get<any>(`${this.path}${datos.id}/`).subscribe(res=>{
      this.infoApe= res
      let t
      res.map(item=>{
        t = item.t
      })
      if(datos.rolUsuario === 'AP'){
        MENU_ITEMS[2]['children'][0].hidden=true
        MENU_ITEMS[2]['children'][2].hidden=true
        MENU_ITEMS[2]['children'][3].hidden=true
        MENU_ITEMS[2]['children'][6].hidden=true
        MENU_ITEMS[3].hidden=true
        MENU_ITEMS[4].hidden=true
        MENU_ITEMS[5].hidden=true
        MENU_ITEMS[6].hidden=true
        MENU_ITEMS[7].hidden=true
        MENU_ITEMS[8].hidden=true
        if(this.infoApe.length > 0 && t == 'Aplazamiento'){
          MENU_ITEMS[2]['children'][2].hidden=false
          MENU_ITEMS[2]['children'][4].hidden=true
          console.log('Se Habilta el reuntegro')
        }else if(this.infoApe.length > 0 && t == 'Reintegro'){
          MENU_ITEMS[2]['children'][2].hidden=true
          MENU_ITEMS[2]['children'][4].hidden=false
        }
        
        
      }else if(datos.rolUsuario === 'AA'){
        console.log('entre al AA')
        MENU_ITEMS[2]['children'][1].hidden=true
        MENU_ITEMS[2]['children'][2].hidden=true
        MENU_ITEMS[2]['children'][4].hidden=true
        MENU_ITEMS[2]['children'][5].hidden=true
        MENU_ITEMS[4].hidden=true
      MENU_ITEMS[5].hidden=false
      }else if(datos.rolUsuario === 'CO'){
        MENU_ITEMS[1].hidden=true
        MENU_ITEMS[2].hidden=true
        MENU_ITEMS[3].hidden=true
        MENU_ITEMS[4].hidden=true
        MENU_ITEMS[5].hidden=true
      }else if (datos.rolUsuario === 'IN'){
        MENU_ITEMS[2]['children'][0].hidden=true
        MENU_ITEMS[2]['children'][1].hidden=true
        MENU_ITEMS[2]['children'][2].hidden=true
        MENU_ITEMS[2]['children'][4].hidden=true
        MENU_ITEMS[2]['children'][5].hidden=true
        MENU_ITEMS[2]['children'][6].hidden=false
        MENU_ITEMS[4].hidden=true
      }
    else if (datos.rolUsuario === 'AD'){
      MENU_ITEMS[2].hidden=true
      MENU_ITEMS[1].hidden=true
      MENU_ITEMS[6].hidden=false
    }else{
      for (let i = 0; i < MENU_ITEMS.length; i++) {
        MENU_ITEMS[i].hidden=true 
      }}
    })
  }
 
}
