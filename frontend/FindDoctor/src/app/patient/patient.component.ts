import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public appointments:string[] = ['District', 'District', 'District', 'District', 'District'];

  constructor() { }

  ngOnInit(): void {
  }

}
