import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//views
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { AdminComponent } from './views/admin/admin.component';
import { HomeComponent } from './views/home/home.component';
import { SignupComponent } from './views/signup/signup.component';

//components

import { NavHomePageComponent } from './components/nav/nav-home-page/nav-home-page.component';
import { NavAdminComponent } from './components/nav/nav-admin/nav-admin.component';

//import
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//services
import {UsersService} from "./services/users.service";
import {ConstantsService } from './services/constants.service'
import {ConfigService} from "./services/config.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    SignupComponent,
    NavHomePageComponent,
    NavAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot({
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
    }),
  ],
  providers: [
      UsersService,
      ConstantsService,
      ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
