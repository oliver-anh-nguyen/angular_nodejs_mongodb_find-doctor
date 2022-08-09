import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfilePatient} from "../profile-patient/ProfilePatient";
import { environment } from 'src/environments/environment';
import { ProfileDoctor } from '../profile-doctor/ProfileDoctor';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getPatientInfo(username: string) {
    return this.http.get<ProfilePatient>(`${environment.baseUrl}patients/${username}`);
  }

  updatePatientInfo(username: string, fullname: string, avatar: string, phone: string) {
    return this.http.patch(`${environment.baseUrl}patients/${username}`, {
      fullname: fullname,
      avatarurl: avatar,
      phone: phone
    })
  }

  getDoctorInfo(username: string) {
    return this.http.get<ProfileDoctor>(`${environment.baseUrl}doctors/${username}`);
  }

  updateDoctorInfo(username: string, data: any) {
    return this.http.patch(`${environment.baseUrl}doctors/${username}`, data)
  }
}
