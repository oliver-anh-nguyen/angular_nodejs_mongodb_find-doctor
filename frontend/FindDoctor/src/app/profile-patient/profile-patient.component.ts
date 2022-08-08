import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.css']
})
export class ProfilePatientComponent implements OnInit {

  isEdit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    this.isEdit = true;
  }

  save() {
    this.isEdit = false;
  }
}
