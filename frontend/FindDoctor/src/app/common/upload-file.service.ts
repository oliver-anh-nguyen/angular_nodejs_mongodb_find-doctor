import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../login/UserInterface";
import { ProfileDoctor } from "../profile-doctor/ProfileDoctor";
import { ProfilePatient } from "../profile-patient/ProfilePatient";

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    constructor(private http: HttpClient) { }

    private buildForm(file: File) {
        let formParams = new FormData();
        formParams.append('avatar', file);

        return formParams;
    }

    public uploadPatientAvatar(user: User | null, file: File) {
        let username = user?.username as string;
        let formParams = this.buildForm(file);
        return this.http.patch<ProfilePatient>(`${environment.baseUrl}patients/${username}`, formParams);
    }

    public uploadDoctorAvatar(user: User | null, file: File) {
        let username = user?.username as string;
        let formParams = this.buildForm(file);
        return this.http.patch<ProfileDoctor>(`${environment.baseUrl}doctors/${username}`, formParams);
    }
}