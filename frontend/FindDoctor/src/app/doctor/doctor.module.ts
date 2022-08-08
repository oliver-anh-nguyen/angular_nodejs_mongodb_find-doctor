import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ValidPhonePipe } from './valid-phone.pipe';


@NgModule({
  declarations: [
    DoctorComponent,
    ValidPhonePipe
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule
  ]
})
export class DoctorModule { }
