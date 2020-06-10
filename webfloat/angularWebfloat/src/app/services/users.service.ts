import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs";
import {ConstantsService} from "./constants.service";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user : any;
  apiUrl : string;
  header : any;

  constructor(
      private http: HttpClient,
      private _constant: ConstantsService,
      private config: ConfigService,
  ) {
      this.apiUrl =this._constant.apiUrl;
  }

    public login(user): Observable<any>{
        this.user = this.http.get(`${this.apiUrl}/user/login`, {params: user});
        return this.user;
    }

    public registrar(user): Observable<any>{
        return this.http.post(`${this.apiUrl}/user/register`,  user);
    }

    public logout(){
       this.user = this.config.user;
       this.header = this.config.header;
       return this.http.get(`${this.apiUrl}/user/logout`,  {params: this.user, headers : this.header});
    }
}