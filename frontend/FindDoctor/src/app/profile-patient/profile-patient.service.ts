import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfilePatient} from "./ProfilePatient";

@Injectable({
  providedIn: 'root'
})
export class ProfilePatientService {

  constructor(private http: HttpClient) { }

  getInfo(username: string) {
    return this.http.get<ProfilePatient>('http://localhost:3000/patients/' + username);
  }

  updateInfo(username: string, fullname: string, avatar: string, phone: string) {
    return this.http.patch('http://localhost:3000/patients/' + username + '/update', {
      fullname: fullname,
      avatarurl: avatar,
      phone: phone
    })
  }
}
