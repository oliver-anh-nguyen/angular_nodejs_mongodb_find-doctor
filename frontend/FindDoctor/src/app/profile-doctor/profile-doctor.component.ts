import { Component, OnInit } from '@angular/core';
import {UserService} from "../login/user.service";
import {ProfileDoctor} from "./ProfileDoctor";
import {Specialty} from "../find-doctors/SpecialtyInterface";
import {FindDoctorsService} from "../find-doctors/find-doctors.service";
import { ProfileService } from '../common/profile.service';

@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.css']
})
export class ProfileDoctorComponent implements OnInit {

  public doctor:ProfileDoctor | null = null;
  isEdit: boolean = false;
  fullname: string = 'Full Name';
  avatarUrl = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  phone: string = '';
  desc: string = '';
  degrees: string = '';
  selectedSpecialty: String | null = null;
  specialties: Array<Specialty>;
  street: string = '';
  city: string = '';
  state: string = '';
  zipcode: string = '';
  constructor(private findDoctorService: FindDoctorsService, private profileService: ProfileService, private userService: UserService) {
    this.specialties = [
    ]
    this.getInfoPatient()
  }

  getInfoPatient() {
    let username = this.userService.getUserState()?.username;
    if (username) {
      this.profileService.getDoctorInfo(username).subscribe(profile => {
        console.log(profile);
        this.doctor = profile;
        this.avatarUrl = this.doctor.avatarurl;
        this.phone = this.doctor.phone;
        this.fullname = this.doctor.fullname;
        this.desc = this.doctor.description;
        this.selectedSpecialty = this.doctor.specialty;
        this.degrees = this.doctor.degrees;
        this.street = this.doctor.location.street;
        this.city = this.doctor.location.city;
        this.state = this.doctor.location.state;
        this.zipcode = this.doctor.location.zipcode;
      })
    }
  }

  ngOnInit(): void {
    this.findDoctorService.getSpecialties().subscribe(
      specialties => {
        this.specialties = specialties;
      }
    );
  }

  edit() {
    this.isEdit = true;
  }

  save() {
    this.isEdit = false;
    // let username = this.userService.getUserState()?.username;
    // if (username) {
    //   this.doctorService.updateInfo(username, this.fullname, this.avatarUrl, this.phone).subscribe(data => {
    //     console.log(data);
    //     alert("Update Successfully!");
    //   })
    // }
  }

}
