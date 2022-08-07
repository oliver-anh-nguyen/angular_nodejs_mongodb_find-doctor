import { Component, OnInit } from '@angular/core';
import {PatientService} from "./patient.service";
import {UserService} from "../login/user.service";
import {AppointmentPatient} from "./AppointmentPatient";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public appointments:Array<AppointmentPatient>= [];
  gridColumns = 4;

  constructor(private patientService: PatientService, private userService: UserService) {
    let username = userService.getUserState()?.username;
    if (username) {
      this.patientService.getAppointments(username)
        .subscribe(data => {
          console.log(data);
          this.appointments = data;
        })
    }
  }

  ngOnInit(): void {
  }

  booking() {
    console.log('go to booking view');
  }

  deleteAppointment() {
    console.log('delete appointment');
  }

}
