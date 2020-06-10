import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  user: User;
  header: any;
  constructor(private router : Router) { }

  setUser(user){
    this.user = user;
    this.header = new HttpHeaders();
      this.header = this.header.set('Authorization', 'Bearer ' + this.user.accessToken);
  }

   canActivate(): boolean {
       if (this.user == undefined) {
           this.router.navigate(['home']);
           return false;
       }
       return true;
   }
}
