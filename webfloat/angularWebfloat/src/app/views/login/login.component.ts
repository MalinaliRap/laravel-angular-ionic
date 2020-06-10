import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public erro: any;
  formUser : FormGroup;
  submitted = false;

  constructor(
      private userService : UsersService,
      private toastService : ToastrService,
      private router : Router
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
