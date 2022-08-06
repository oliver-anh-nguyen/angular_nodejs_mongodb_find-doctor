import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['pa1'],
      password: ['123']
    })
  }

  login(): void {
    console.log("login userService");
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);
    this.userService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(res => {
        console.log(res);
        this.userService.userState$.next(res);
        this.userService.persistState();
        let state = this.userService.getUserState();
        console.log(`login() with role:  ${state?.role}`);
        if (state?.role === 'PATIENT') {
          this.router.navigate(['/', 'patient'])
        } else {
          this.router.navigate(['/', 'doctor'])
        }

      });
  }

}