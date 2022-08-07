import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";
// import { MatDatepickerModule } from '@matheo/datepicker';
// import { MatNativeDateModule } from '@matheo/datepicker/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    // MatDatepickerModule,
    // MatNativeDateModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
