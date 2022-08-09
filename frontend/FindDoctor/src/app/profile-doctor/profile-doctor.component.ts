import { Component, OnInit } from '@angular/core';
import {UserService} from "../login/user.service";
import {ProfileDoctor} from "./ProfileDoctor";
import {Specialty} from "../find-doctors/SpecialtyInterface";
import {FindDoctorsService} from "../find-doctors/find-doctors.service";
import { ProfileService } from '../common/profile.service';
import { UploadFileService } from '../common/upload-file.service';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.css']
})
export class ProfileDoctorComponent implements OnInit {

  public doctor:ProfileDoctor | null = null;
  isEdit: boolean = false;
  fullname: string = 'Full Name';
  avatarUrl = 'assets/images/default_avatar.jpeg';
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

  constructor(private findDoctorService: FindDoctorsService,
              private profileService: ProfileService,
              private userService: UserService,
              private uploadFileService: UploadFileService,
              private toast: NgToastService) {
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
        if (this.doctor.avatarurl) {
          this.avatarUrl = this.doctor.avatarurl;
        }
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
    console.log('save profile doctor');
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

        let location: any = {
          street: this.street,
          city: this.city,
          state: this.state,
          zipcode: this.zipcode
        };
        data['location'] = location;
        console.log(data);
      }
      this.profileService.updateDoctorInfo(username, data).subscribe(profile => {
        console.log(profile);
        this.doctor = profile as ProfileDoctor;
        if (this.doctor.avatarurl) {
          this.avatarUrl = this.doctor.avatarurl;
        }
        this.phone = this.doctor.phone;
        this.fullname = this.doctor.fullname;
        this.desc = this.doctor.description;
        this.selectedSpecialty = this.doctor.specialty;
        this.degrees = this.doctor.degrees;
        this.street = this.doctor.location.street;
        this.city = this.doctor.location.city;
        this.state = this.doctor.location.state;
        this.zipcode = this.doctor.location.zipcode;
        this.toast.success({detail: 'Success Message', summary:'Update Successfully!', duration: 5000});
      }, error => {
        this.toast.error({detail: 'Error Message', summary: error.error.error, duration: 5000});
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
        if (this.doctor.avatarurl) {
          this.avatarUrl = this.doctor.avatarurl;
        }
        this.phone = this.doctor.phone;
        this.fullname = this.doctor.fullname;
        this.desc = this.doctor.description;
        this.selectedSpecialty = this.doctor.specialty;
        this.degrees = this.doctor.degrees;
        this.street = this.doctor.location.street;
        this.city = this.doctor.location.city;
        this.state = this.doctor.location.state;
        this.zipcode = this.doctor.location.zipcode;
        this.toast.success({detail: 'Success Message', summary:'Update avatar successfully!', duration: 5000});
      });
    } else {
      console.log('There is no selected file');
      this.toast.error({detail: 'Error Message', summary:'There is no file selected!', duration: 5000});
    }
  }

}
