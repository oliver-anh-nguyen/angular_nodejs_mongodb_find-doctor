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

    private buildForm(user: User | null, file: File) {
        let formParams = new FormData();
        // let fullname = user?.fullname as string;
        formParams.append('avatar', file);
        // formParams.append('fullname', fullname);

        return formParams;
    }

    public uploadPatientAvatar(user: User | null, file: File) {
        // let formParams = new FormData();
        // let fullname = user?.fullname as string;
        let username = user?.username as string;
        // formParams.append('avatar', file);
        // formParams.append('fullname', fullname);
        let formParams = this.buildForm(user, file);
        return this.http.patch<ProfilePatient>(`${environment.baseUrl}patients/${username}/update`, formParams);
    }

    public uploadDoctorAvatar(user: User | null, file: File) {
        let username = user?.username as string;
        let formParams = this.buildForm(user, file);
        return this.http.patch<ProfileDoctor>(`${environment.baseUrl}doctors/${username}`, formParams);
    }
}