import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppointmentPatient} from "./AppointmentPatient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getAppointments(username: string) {
    return this.http.get<Array<AppointmentPatient>>('http://localhost:3000/patients/' + username + '/appointment');
  }

  cancelAppointments(username: string, doctor: string, time: number) {
    return this.http.patch('http://localhost:3000/patients/' + username + '/appointment', {
      doctorUsername: doctor,
      time: time
    });
  }
}
