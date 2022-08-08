import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../login/user.service';
import { Doctor } from './DoctorInterface';
import { FindDoctorsService } from './find-doctors.service';
import { Specialty } from './SpecialtyInterface';
import {Router} from "@angular/router";

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
  // dateControl = new FormControl(new Date());
  dateControl = new UntypedFormControl();
  selectedTime: moment.Moment = moment(new Date());

  commonSearches: Array<String>

  constructor(private fb: FormBuilder, private findDoctorService: FindDoctorsService, private userService: UserService, private router: Router) {

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

  searchDoctors() {
    console.log('Going to search doctor')
    console.log(this.selectedSpecialty);
    console.log(this.searchForm.value);
    this.findDoctorService.searchDoctors(this.selectedSpecialty, this.selectedState).subscribe(
      doctors => {
        console.log(doctors);
        this.doctors = doctors;
      }
    );
  }

  searchCommonDoctors(specialty: String) {
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

  book() {
    console.log('Do book for doctor', this.detailDoctor);
    console.log(this.dateControl.get)
    let cur = moment(new Date());
    if (this.selectedTime < cur) {
      console.log('book: Select passed date'); // TODO: show error
      alert(`Can't select passed date! Try another date!`);
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
      alert('Booking appointment successfully!');
      this.router.navigate(['/', 'patient']);
    }, err => {
      console.log(err);
      alert("Something went wrong! Try again later!");
    });
  }

}
