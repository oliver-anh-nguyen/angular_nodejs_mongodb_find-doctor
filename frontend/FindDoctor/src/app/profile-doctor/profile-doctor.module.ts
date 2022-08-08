import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileDoctorRoutingModule } from './profile-doctor-routing.module';
import { ProfileDoctorComponent } from './profile-doctor.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    ProfileDoctorComponent
  ],
  imports: [
    CommonModule,
    ProfileDoctorRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ]
})
export class ProfileDoctorModule { }
