import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePatientComponent } from './profile-patient.component';

const routes: Routes = [{ path: '', component: ProfilePatientComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePatientRoutingModule { }
