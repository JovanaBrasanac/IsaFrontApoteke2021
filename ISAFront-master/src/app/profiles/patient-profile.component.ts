import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { Patient } from '../model/Patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-profle',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfleComponent implements OnInit {

  constructor(private patientService: PatientService, private router: Router) { }

  private isButtonVisible = false;

  role: string;
  patientUsername: string;
  patient: Patient;
  newPatient: Patient = new Patient();
  firstNameToChange: string;
  lastNameToChange: string;
  cityToChange: string;
  addressToChange: string;
  countryToChange: string;
  mobileNumberToChange: number;

  ngOnInit() {

    this.checkRole();
    this.getPatient();
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PA"){

      window.alert("Niste ulogovani kao pacijent i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  getPatient() {
    this.patientUsername = sessionStorage.getItem("authenticatedUser");
    this.patientService.getPatient(this.patientUsername).subscribe(
      data => {
        this.patient = data;
        console.log(this.patient);
        console.log(this.patient.firstName);
      },
      error => {
        console.log(error);
      }
    )
  }

  change(isButtonVisible: boolean) {
    this.isButtonVisible = isButtonVisible;
  }

  change1(isButtonVisible: boolean) {
    this.isButtonVisible = isButtonVisible;
    console.log(this.newPatient.firstName);
    if (this.newPatient.firstName === "") {
      this.newPatient.firstName = this.patient.firstName;
    }
    if (this.newPatient.lastName === "") {
      this.newPatient.lastName = this.patient.lastName;
    }
    if (this.newPatient.city === "") {
      this.newPatient.city = this.patient.city;
    }
    if (this.newPatient.country === "") {
      this.newPatient.country = this.patient.country;
    }
    if (this.newPatient.address === "") {
      this.newPatient.address = this.patient.address;
    }
    if (this.newPatient.mobileNumber !== NaN) {
      this.newPatient.mobileNumber = this.patient.mobileNumber;
    }

    this.newPatient.username = this.patient.username;
    this.newPatient.password = this.patient.password;
    this.newPatient.email = this.patient.email;
    this.newPatient.jmbg = this.patient.jmbg;
    this.getPatient();
    this.patientService.changePatientInfo(this.newPatient).subscribe();
    this.getPatient();
  }

}
