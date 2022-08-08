import { Component, OnInit } from '@angular/core';
import {AppointmentPatient} from "../patient/AppointmentPatient";
import {ProfilePatient} from "./ProfilePatient";
import {ProfilePatientService} from "./profile-patient.service";
import {UserService} from "../login/user.service";

@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.css']
})
export class ProfilePatientComponent implements OnInit {

  public patient:ProfilePatient | null = null;
  isEdit: boolean = false;
  avatarUrl = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  constructor(private profileService: ProfilePatientService, private userService: UserService) {
    this.getInfoPatient()
  }

  getInfoPatient() {
    let username = this.userService.getUserState()?.username;
    if (username) {
      this.profileService.getInfo(username).subscribe(profile => {
        console.log(profile);
        this.patient = profile;
        this.avatarUrl = this.patient.avatarurl;
      })
    }
  }

  ngOnInit(): void {
  }

  edit() {
    this.isEdit = true;
  }

  save() {
    this.isEdit = false;
  }
}
