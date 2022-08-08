import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePatientRoutingModule } from './profile-patient-routing.module';
import { ProfilePatientComponent } from './profile-patient.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProfilePatientComponent
  ],
  imports: [
    CommonModule,
    ProfilePatientRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ]
})
export class ProfilePatientModule { }
