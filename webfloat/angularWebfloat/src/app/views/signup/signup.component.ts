import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {FormGroup, FormControl} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    public user: User;
    public erro: any;
    formUser : FormGroup;
  constructor(
      private userService : UsersService,
      private toastrService : ToastrService,
      public router : Router
  ) {
      this.createForm(new User());
  }

  ngOnInit() {
      this.user = new User();
  }

    createForm(user : User){
        this.formUser = new FormGroup({
            name : new FormControl(user.name),
            email : new FormControl(user.email),
            password : new FormControl(user.password),
            password_confirmation : new FormControl(user.password_confirmation),
        })
    }

    onSubmit(){
        this.userService.registrar(this.formUser.value).subscribe( (data: User) => {
            this.user = data.user;
            this.user.accessToken = data.access_token;
            this.toastrService.success('Usuário cadastrado com sucesso','Sucesso');
            this.router.navigate(['home']);
        },error =>{
            this.erro =error.error.errors;
            var msg = "<ul>";
            Object.entries(this.erro).forEach(([key, value]) => {
                msg += "<li>" + key + "</li>"
                msg += "<ul>"
                value.forEach( function (item) {
                 msg += "<li>"+item+"</li>"
                })
                msg += "</ul>"
            });
            msg += "</ul>"

            this.toastrService.error(msg,'Erro', {
                enableHtml: true,
                closeButton: true,
                timeOut: 10000
            });
        });
    }

}
