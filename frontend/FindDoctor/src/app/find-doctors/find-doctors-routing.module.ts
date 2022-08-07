import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindDoctorsComponent } from './find-doctors.component';

const routes: Routes = [{ path: '', component: FindDoctorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindDoctorsRoutingModule { }
