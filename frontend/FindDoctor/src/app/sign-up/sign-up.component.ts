import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../login/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  role = 'Patient';
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signupForm = this.fb.group({
      username: [''],
      password: [''],
      fullname: [''],
      role:['Patient']
    })
  }

  ngOnInit(): void {
  }

  signup() {
    if (!this.signupForm.valid) {
      console.log("signup invalid");
      return
    }
    console.log("signup valid");
    this.userService.signup(this.signupForm.value.username, this.signupForm.value.password, this.signupForm.value.fullname, this.signupForm.value.role)
      .subscribe(res => {
        console.log(res);
        alert("SignUp successfully!")
        this.router.navigate(['/', 'login'])
      }, err => {
        console.log(err.error.error);
        alert(err.error.error ? err.error.error : "Something went wrong! Try again later!");
      });
  }

  login() {
    this.router.navigate(['/', 'login'])
  }

}
