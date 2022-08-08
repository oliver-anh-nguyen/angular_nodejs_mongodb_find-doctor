import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../login/UserInterface";

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    constructor(private http: HttpClient) { }

    public uploadUserProfile(user: 
        User | null, file: File) {
        let formParams = new FormData();
        let fullname = user?.fullname as string;
        let username = user?.username as string;
        formParams.append('avatar', file);
        formParams.append('fullname', fullname);
        return this.http.patch(environment.baseUrl + 'patients/' + username + '/update', formParams);
    }
}