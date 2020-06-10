import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {UsersService} from "../../../services/users.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {

  public user: User;

  constructor(
      private userService : UsersService,
      private toastService : ToastrService,
      private config : ConfigService,
      private router : Router
  ) { }

  ngOnInit() {

  }

  logout(){
      this.userService.logout().subscribe( (data) => {
          this.config.user.accessToken = null;
          this.router.navigate(['home']);
      },error =>{
          this.erro = error;
      });
  }

}
