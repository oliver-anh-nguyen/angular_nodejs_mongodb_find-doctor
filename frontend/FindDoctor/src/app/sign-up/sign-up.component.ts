import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../login/user.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  role = 'Patient';
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toast: NgToastService) {
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
        this.toast.success({detail: 'Success Message', summary: "SignUp successfully!", duration: 5000});
        this.router.navigate(['/', 'login'])
      }, err => {
        console.log(err.error.error);
        let messErr = err.error.error ? err.error.error : "Something went wrong! Try again later!";
        this.toast.error({detail: 'Error Message', summary: messErr, duration:5000});
      });
  }

  login() {
    this.router.navigate(['/', 'login'])
  }

}
