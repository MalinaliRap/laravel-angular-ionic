import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {ConfigService} from "../../../services/config.service";


@Component({
  selector: 'app-nav-home-page',
  templateUrl: './nav-home-page.component.html',
  styleUrls: ['./nav-home-page.component.css']
})
export class NavHomePageComponent implements OnInit {

  public user: User;
  public erro: any;
  formUser : FormGroup;
  submitted = false;

  constructor(
      private userService : UsersService,
      private toastService : ToastrService,
      private router : Router,
      private config : ConfigService
  ) {
    this.createForm(new User());
  }

  ngOnInit() {
      this.user = new User();
  }

  createForm(user : User){
    this.formUser = new FormGroup({
        email : new FormControl(user.email,[
                Validators.required,
                Validators.email,
            ]),
        password : new FormControl(user.password,[
            Validators.required,
            Validators.minLength(4),
        ]),
    })
  }

  get f() {
      return this.formUser.controls;
  }

  onSubmit(){
      this.submitted = true;
      this.userService.login(this.formUser.value).subscribe( (data: User) => {
          this.user = data.user;
          this.user.accessToken = data.access_token;
          this.config.setUser(this.user);
          this.router.navigate(['admin']);
      },error =>{
          this.erro = error;
          if(this.erro.status == 401){
              this.toastService.error('Credenciais inválidas','Erro');
          }else{
              this.toastService.error('Erro ao efetuar login','Erro');
          }
      });
  }

}
