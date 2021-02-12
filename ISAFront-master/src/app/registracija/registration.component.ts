import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Patient } from '../model/Patient';
import { Router } from '@angular/router';
import { PatientService } from '../service/patient.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegistrationComponent
  ],
  bootstrap: [RegistrationComponent]
})

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  patient: Patient = new Patient();
  passRepassNotValid = false;

  constructor(private patientService: PatientService, private router: Router) { }

  registrationClick() {
    console.log(this.patient.address);
    console.log(this.patient.city);
    console.log(this.patient.country); console.log(this.patient.email); console.log(this.patient.firstName);
    console.log(this.patient.jmbg); console.log(this.patient.lastName); console.log(this.patient.mobileNumber);
    console.log(this.patient.password); console.log(this.patient.username); console.log(this.patient.repassword);

    if (this.patient.password !== this.patient.repassword) {
      this.passRepassNotValid = true;
    }
    else if (this.patient.username == "" || this.patient.firstName == "" || this.patient.lastName == "" || this.patient.email == "" || this.patient.password == "" || this.patient.repassword == "") {
      console.log('Neispravan unos');
    }
    else {
      this.passRepassNotValid = false;
      this.router.navigate(['/login']);
      this.patientService.register(this.patient).subscribe(
        (result) => {
          console.log('Registracija!');
        }
      );
    }
  }

  ngOnInit() {
  }

  private isButtonVisible = true;

  change(isButtonVisible: boolean) {
    this.isButtonVisible = isButtonVisible;
  }
}
