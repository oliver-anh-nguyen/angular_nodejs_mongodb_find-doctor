import { Component, OnInit } from '@angular/core';
import {PatientService} from "./patient.service";
import {UserService} from "../login/user.service";
import {AppointmentPatient} from "./AppointmentPatient";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public appointments:Array<AppointmentPatient>= [];
  gridColumns = 4;

  constructor(private patientService: PatientService, private userService: UserService, private router: Router) {
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
        alert("Something went wrong! Try again later!");
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
        alert(res);
        this.getListAppointment();
      }, error => {
        console.log(`delete appointment` + error);
        alert("Something went wrong! Try again later!");
      })
    }
  }
}
