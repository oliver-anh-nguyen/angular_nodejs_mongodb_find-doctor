import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Doctor } from "./DoctorInterface";
import { Specialty } from "./SpecialtyInterface";

@Injectable({
    providedIn: 'root'
})
export class FindDoctorsService {
    constructor(private http: HttpClient) {
    }

    getSpecialties() {
        let url = environment.baseUrl + 'specialties';
        console.log('Get specialties:', url);
        return this.http.get<Array<Specialty>>(url);
    }

    searchDoctors(specialty: String | null, state: String | null) {
        let url = environment.baseUrl + 'doctors/search?';
        if (specialty) {
            url += 'specialty=' + specialty + '&';
        }
        if (state) {
            url += 'state=' + state;
        }
        console.log('Search doctor url ', url);
        return this.http.get<Array<Doctor>>(url);
    }

    book(patient: String, doctor: String, time: String) {
        let url = environment.baseUrl + 'patients/' + patient + '/' + 'appointments';
        let body = {
            "doctorUsername": doctor,
            "time": time
        }
        return this.http.post(url, body);
    }
}
