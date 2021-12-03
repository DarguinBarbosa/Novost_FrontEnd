import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../data/users';

@Injectable()
export class UserService extends UserData {

  private time: Date = new Date;
  private  datos= JSON.parse(localStorage.getItem('data'))
  private data:string = this.datos.nombresUsuario+" "+this.datos.apellidosUsuario;
   users = {
    usu:{name:this.data}
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };
  private contacts: Contacts[] = [
  
  ];
  private recentUsers: RecentUsers[]  = [
 
  ];
  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): Observable<any> {
    console.log(this.users)
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }
}
