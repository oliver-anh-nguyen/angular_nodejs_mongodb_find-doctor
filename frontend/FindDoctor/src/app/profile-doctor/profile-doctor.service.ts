import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileDoctor} from "./ProfileDoctor";

@Injectable({
  providedIn: 'root'
})
export class ProfileDoctorService {

  constructor(private http: HttpClient) { }

  getInfo(username: string) {
    return this.http.get<ProfileDoctor>('http://localhost:3000/doctors/' + username);
  }

  updateInfo(username: string, fullname: string, avatar: string, phone: string) {
    return this.http.patch('http://localhost:3000/patients/' + username + '/update', {
      fullname: fullname,
      avatarurl: avatar,
      phone: phone
    })
  }

}
