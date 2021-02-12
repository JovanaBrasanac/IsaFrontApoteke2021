import { Component, OnInit } from '@angular/core';
import { Doctor } from '../model/Doctor';
import { DoctorService } from '../service/doctor.service';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dermatologist-new',
  templateUrl: './dermatologist-new.component.html',
  styleUrls: ['./dermatologist-new.component.css']
})
export class DermatologistNewComponent implements OnInit {
  user: User = new User();
  doctor: Doctor = new Doctor();
  constructor(private service: DoctorService, private router: Router) { }

  form3 = new FormGroup({
    Username: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    firstNameCA: new FormControl('', Validators.required),
    lastNameCA: new FormControl('', Validators.required),
    emailCA: new FormControl('', Validators.required),
    addressCA: new FormControl('', Validators.required),
    cityCA: new FormControl('', Validators.required),
    countryCA: new FormControl('', Validators.required),
    mobileNumberCA: new FormControl('', Validators.required),
    jmbgCA: new FormControl('', Validators.required),
  })

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.doctor.address);
    this.user.username = sessionStorage.getItem("authenticatedUser");
    this.service.addDoctorDerm(this.doctor, this.user.username).subscribe(
      data => {
        window.alert("Dermatolog je dodat!");
        this.router.navigateByUrl("/dermatologists");
      }, error => {
        console.log(error);
      }
    );
  }

}
