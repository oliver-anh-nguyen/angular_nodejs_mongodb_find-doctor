import { Component, OnInit } from '@angular/core';
import {AppointmentPatient} from "../patient/AppointmentPatient";
import {PatientService} from "../patient/patient.service";
import {UserService} from "../login/user.service";
import {Router} from "@angular/router";
import {AppointmentDoctor} from "./AppointmentDoctor";
import {DoctorService} from "./doctor.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  public appointments:Array<AppointmentDoctor>= [];
  gridColumns = 4;

  constructor(private doctorService: DoctorService, private userService: UserService, private router: Router) {
    this.getListAppointment();
  }

  getListAppointment() {
    let username = this.userService.getUserState()?.username;
    if (username) {
      this.doctorService.getAppointments(username)
        .subscribe(data => {
          console.log(data);
          this.appointments = data;
        })
    }
  }

  updateAppointment(usernameDoctor: string, time: number) {

  }

  ngOnInit(): void {
  }

}
