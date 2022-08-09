import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../login/user.service';
import { Doctor } from './DoctorInterface';
import { FindDoctorsService } from './find-doctors.service';
import { Specialty } from './SpecialtyInterface';
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-find-doctors',
  templateUrl: './find-doctors.component.html',
  styleUrls: ['./find-doctors.component.css']
})
export class FindDoctorsComponent implements OnInit {
  searchForm!: FormGroup;
  doctorListShown: Boolean = true;
  detailDoctor: Doctor | null = null;
  defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg";
  selectedSpecialty: String | null = null;
  specialties: Array<Specialty>;
  states: Array<String>;
  selectedState: String | null = null;
  doctors: Array<Doctor> = [];
  @ViewChild('picker') picker: any;

  disabled = false;
  showSpinners = true;
  showSeconds = false;
  touchUi = false;
  enableMeridian = false;
  disableMinute = false;
  hideTime = false;
  stepHour = 1;
  stepMinute = 10;
  stepSecond = 1;
  dateControl = new UntypedFormControl();
  selectedTime: moment.Moment = moment(new Date());
  searchedSpecialty: String = "Dentist";

  commonSearches: Array<String>

  constructor(private fb: FormBuilder,
              private findDoctorService: FindDoctorsService,
              private userService: UserService,
              private router: Router,
              private toast: NgToastService) {

    this.specialties = [
    ]

    this.states = ['Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming'
    ]

    this.commonSearches = ['Dentist', 'Cardiologist', 'Gastroenterologist', 'Podiatrists', 'Pulmonologists'];

    this.searchForm = fb.group({
      specialty: this.specialties[0],
      state: this.states[0]
    });
  }

  capitalizeFirstLetter(s: String) {
    if (s.length == 0) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  searchDoctors() {
    console.log('Going to search doctor')
    console.log(this.selectedSpecialty);
    console.log(this.searchForm.value);
    this.searchedSpecialty = this.selectedSpecialty as String;
    this.searchedSpecialty = this.capitalizeFirstLetter(this.selectedSpecialty as String);
    this.findDoctorService.searchDoctors(this.selectedSpecialty, this.selectedState).subscribe(
      doctors => {
        console.log(doctors);
        this.doctors = doctors;
      }
    );
  }

  searchCommonDoctors(specialty: String) {
    this.searchedSpecialty = this.capitalizeFirstLetter(specialty);
    specialty = specialty.toLowerCase();
    this.findDoctorService.searchDoctors(specialty, null).subscribe(
      doctors => {
        console.log(doctors);
        this.doctors = doctors;
      }
    );
  }

  ngOnInit(): void {
    this.findDoctorService.getSpecialties().subscribe(
      specialties => {
        this.specialties = specialties;
      }
    );

    // testing
    this.findDoctorService.searchDoctors('dentist', this.selectedState).subscribe(
      doctors => {
        console.log(doctors);
        this.doctors = doctors;
      }
    );
  }

  showList() {
    this.doctorListShown = true;
    this.detailDoctor = null;
  }

  showDetail(doctor: Doctor) {
    console.log('show detail', doctor);
    this.doctorListShown = false;
    this.detailDoctor = doctor;
  }

  bookedDateChanged(event: any) {
    console.log(event);
    console.log(event.value);
    let selectedDate = event.value;
    this.selectedTime = moment(selectedDate);
    console.log(this.selectedTime.format('YYYY-MM-DDTHH:mm:ss'))
  }

  bookFromMain() {
    // TODO: implement
  }

  book() {
    console.log('Do book for doctor', this.detailDoctor);
    console.log(this.dateControl.get)
    let cur = moment(new Date());
    if (this.selectedTime < cur) {
      console.log('book: Select passed date'); // TODO: show error
      this.toast.warning({detail: 'Warning Message', summary:`Can't select passed date!`, duration: 5000});
      return;
    } else {
      console.log('book: Correct date');
    }
    console.log(this.userService.getUserState()?.username)
    let patient = this.userService.getUserState()?.username;
    let doctor: String = "";
    if (!patient) {
      patient = "";
    }
    if (this.detailDoctor) {
      doctor = this.detailDoctor.username;
    }
    let selectedTime = this.selectedTime.format('YYYY-MM-DDTHH:mm:ss');
    this.findDoctorService.book(patient, doctor, selectedTime).subscribe((val) => {
      this.toast.success({detail: 'Success Message', summary:'Booking appointment successfully!', duration: 5000});
      this.router.navigate(['/', 'patient']);
    }, err => {
      console.log(err);
      this.toast.error({detail: 'Error Message', summary:"Something went wrong! Try again later!", duration: 5000});
    });
  }

}
