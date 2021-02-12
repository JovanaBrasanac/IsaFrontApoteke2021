import { Component, OnInit } from '@angular/core';
import { ClinicAdministrator } from '../model/ClinicAdministrator';
import { User } from '../model/User';
import { PatientService } from '../service/patient.service';
import { ClinicAdministratorService } from '../service/clinicAdministrator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinic-admin-profile',
  templateUrl: './clinic-admin-profile.component.html',
  styleUrls: ['../profiles/clinic-center-administrator.component.css']
})
export class ClinicAdminProfileComponent implements OnInit {
  user: User = new User();
  invalidLogin = false;
  errorMessage = 'Pogrešan unos!';
  cadmin: ClinicAdministrator = new ClinicAdministrator();
  newAdmin: ClinicAdministrator = new ClinicAdministrator();
  role: string;

  constructor(private service: ClinicAdministratorService, private router: Router) { }

  ngOnInit() {

    this.checkRole();
    this.getcadmin();
    
  }
  private isButtonVisible = false;

  private isButtonVisible2 = false;

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PharmAdmin"){

      window.alert("Niste ulogovani kao admin apoteke i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }
  getcadmin() {
    this.user.username = sessionStorage.getItem("authenticatedUser");
    console.log(this.user.username)
    this.service.getCadmin(this.user.username).subscribe(
      data => {
        this.cadmin = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  change(isButtonVisible: boolean) {
    if (this.isButtonVisible == false)
      this.isButtonVisible = true;
    else this.isButtonVisible = false;
  }

  change2(isButtonVisible2: boolean) {
    if (this.isButtonVisible2 == false)
      this.isButtonVisible2 = true;
    else this.isButtonVisible2 = false;
  }

  submitNewInfo() {
    this.invalidLogin = false;
    this.isButtonVisible2 = false;
    if (this.newAdmin.password === "") {
      this.newAdmin.password = this.cadmin.password;
    } else if (this.newAdmin.oldPassword != this.cadmin.password) {
      this.invalidLogin = true;
    }
    if (this.newAdmin.firstName === "") {
      this.newAdmin.firstName = this.cadmin.firstName;
    }
    if (this.newAdmin.lastName === "") {
      this.newAdmin.lastName = this.cadmin.lastName;
    }
    if (this.newAdmin.city === "") {
      this.newAdmin.city = this.cadmin.city;
    }
    if (this.newAdmin.country === "") {
      this.newAdmin.country = this.cadmin.country;
    }
    if (this.newAdmin.address === "") {
      this.newAdmin.address = this.cadmin.address;
    }
    if (this.newAdmin.mobileNumber === NaN) {
      this.newAdmin.mobileNumber = this.cadmin.mobileNumber;
    }
    if (this.newAdmin.email === "") {
      this.newAdmin.email = this.cadmin.email;
    }
    this.newAdmin.username = this.cadmin.username;

    if (this.invalidLogin == false) {
      if (this.newAdmin.password != this.cadmin.password) {
        alert("Šifra je uspešno promenjena!");
      }
      location.reload();
      this.service.changeAdminInfo(this.newAdmin).subscribe()

    }
  }
}
