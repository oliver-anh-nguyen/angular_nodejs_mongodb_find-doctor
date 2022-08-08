import { Component, OnInit } from '@angular/core';
import { UserService } from '../login/user.service';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.css']
})
export class ProfilePatientComponent implements OnInit {
  isAvatarEditing: boolean = false;
  isEdit: boolean = false;
  file: File | null = null;

  constructor(private userService: UserService, private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
  }

  edit() {
    this.isEdit = true;
  }

  save() {
    this.isEdit = false;
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
      this.uploadFileService.uploadUserProfile(user, this.file).subscribe(result => {
        console.log(result);
        this.isAvatarEditing = false;
      });
    } else {
      console.log('There is no selected file');
      alert('There is no file selected.');
    }
  }
}
