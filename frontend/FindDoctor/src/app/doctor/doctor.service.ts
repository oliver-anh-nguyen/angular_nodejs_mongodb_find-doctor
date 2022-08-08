import { Injectable } from '@angular/core';
import {AppointmentPatient} from "../patient/AppointmentPatient";
import {HttpClient} from "@angular/common/http";
import {AppointmentDoctor} from "./AppointmentDoctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getAppointments(username: string) {
    return this.http.get<Array<AppointmentDoctor>>('http://localhost:3000/doctors/' + username + '/appointments');
  }

  updateAppointment(username: string, doctor: string, time: number) {

  }
}
