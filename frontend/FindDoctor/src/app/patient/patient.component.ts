import { Component, OnInit } from '@angular/core';
import {PatientService} from "./patient.service";
import {UserService} from "../login/user.service";
import {AppointmentPatient} from "./AppointmentPatient";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public appointments:Array<AppointmentPatient>= [];
  gridColumns = 4;

  constructor(private patientService: PatientService,
              private userService: UserService,
              private router: Router,
              private toast: NgToastService) {
    this.getListAppointment();
  }

  getListAppointment() {
    let username = this.userService.getUserState()?.username;
    if (username) {
      this.patientService.getAppointments(username)
        .subscribe(data => {
          console.log(data);
          this.appointments = data;
        },error => {
        console.log(`get appointments` + error);
          this.toast.error({detail: 'Error Message', summary: "Something went wrong! Try again later!", duration:5000});
      })
    }
  }

  ngOnInit(): void {
  }

  booking() {
    this.router.navigate(['/', 'find-doctors']);
  }

  deleteAppointment(usernameDoctor: string, time: number) {
    let username = this.userService.getUserState()?.username;
    if (username) {
      this.patientService.cancelAppointment(username, usernameDoctor, time).subscribe(res => {
        let mess = res as string
        this.toast.success({detail: 'Success Message', summary: mess, duration:5000});
        this.getListAppointment();
      }, error => {
        console.log(`delete appointment` + error);
        this.toast.error({detail: 'Error Message', summary: "Something went wrong! Try again later!", duration:5000});
      })
    }
  }
}
