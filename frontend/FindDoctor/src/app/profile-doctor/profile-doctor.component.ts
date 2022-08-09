import { Component, OnInit } from '@angular/core';
import {UserService} from "../login/user.service";
import {ProfileDoctor} from "./ProfileDoctor";
import {Specialty} from "../find-doctors/SpecialtyInterface";
import {FindDoctorsService} from "../find-doctors/find-doctors.service";
import { ProfileService } from '../common/profile.service';
import { UploadFileService } from '../common/upload-file.service';

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
  isAvatarEditing: boolean = false;
  file: File | null = null;

  constructor(private findDoctorService: FindDoctorsService, private profileService: ProfileService,
    private userService: UserService, private uploadFileService: UploadFileService) {
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
    let username = this.userService.getUserState()?.username;
    let data: any = {};
    if (username) {
      if (this.doctor) {
        if (this.doctor.fullname != this.fullname) {
          data['fullname'] = this.fullname;
        }
        if (this.doctor.phone != this.phone) {
          data['phone'] = this.phone;
        }
        if (this.doctor.description != this.desc) {
          data['description'] = this.desc;
        }
        if (this.doctor.specialty != this.selectedSpecialty) {
          data['specialty'] = this.selectedSpecialty;
        }
        if (this.doctor.degrees != this.degrees) {
          data['degrees'] = this.degrees;
        }
        if ((!this.doctor.location && this.street.length > 0) || this.doctor.location.street != this.street) {
          data['location']['street'] = this.street;
        }
        if ((!this.doctor.location && this.city.length > 0) || this.doctor.location.city != this.city) {
          data['location']['city'] = this.city;
        }
        if ((!this.doctor.location && this.state.length > 0) || this.doctor.location.state != this.state) {
          data['location']['state'] = this.state;
        }
        if ((!this.doctor.location && this.zipcode.length > 0) || this.doctor.location.zipcode != this.zipcode) {
          data['location']['zipcode'] = this.zipcode;
        }
        console.log(data);
      }
      this.profileService.updateDoctorInfo(username, data).subscribe(profile => {
        console.log(profile);
        this.doctor = profile as ProfileDoctor;
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
        alert("Update Successfully!");
      })
    }
  }

  changeImage(event: any) {
    this.file = event.target.files[0];
  }

  editAvatar() {
    this.isAvatarEditing = true;
  }

  uploadAvatar() {
    if (this.file) {
      console.log('going to upload file: ', this.file);
      const user = this.userService.getUserState();
      this.uploadFileService.uploadDoctorAvatar(user, this.file).subscribe(profile => {
        console.log(profile);
        this.isAvatarEditing = false;
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
      });
    } else {
      console.log('There is no selected file');
      alert('There is no file selected.');
    }
  }

}
