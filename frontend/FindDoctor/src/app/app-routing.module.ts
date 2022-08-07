import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {CheckTokenGuard} from "./check-token.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule),
    canActivate: [CheckTokenGuard]
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule),
    canActivate: [CheckTokenGuard]
  },
  {
    path: 'find-doctors',
    loadChildren: () => import('./find-doctors/find-doctors.module').then(m => m.FindDoctorsModule),
    canActivate: [CheckTokenGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})

export class AppRoutingModule {
}
