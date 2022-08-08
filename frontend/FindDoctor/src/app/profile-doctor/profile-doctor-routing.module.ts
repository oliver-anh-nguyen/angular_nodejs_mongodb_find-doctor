import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDoctorComponent } from './profile-doctor.component';

const routes: Routes = [{ path: '', component: ProfileDoctorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDoctorRoutingModule { }
