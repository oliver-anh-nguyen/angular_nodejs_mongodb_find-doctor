import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppointmentDoctor} from "./AppointmentDoctor";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getAppointments(username: string) {
    return this.http.get<Array<AppointmentDoctor>>(`${environment.baseUrl}doctors/${username}/appointments`);
  }

  updateAppointment(username: string, patient: string, time: number, status: string) {
    return this.http.patch(`${environment.baseUrl}doctors/${username}/appointments`, {
      patientUsername: patient,
      time: time,
      status: status
    });
  }
}
