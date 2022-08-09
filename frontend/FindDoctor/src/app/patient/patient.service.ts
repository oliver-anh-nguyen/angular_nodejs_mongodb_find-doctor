import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppointmentPatient} from "./AppointmentPatient";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getAppointments(username: string) {
    return this.http.get<Array<AppointmentPatient>>(`${environment.baseUrl}patients/${username}/appointments`);
  }

  cancelAppointment(username: string, doctor: string, time: number) {
    return this.http.patch(`${environment.baseUrl}patients/${username}/appointments`, {
      doctorUsername: doctor,
      time: time
    });
  }
}
