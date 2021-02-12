import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HolidayRequest } from '../model/HolidayRequest';

@Component({
  selector: 'app-doktor-home-page',
  templateUrl: './doktor-home-page.component.html',
  styleUrls: ['./clinic-center-administrator.component.css']
})
export class DoktorHomePageComponent implements OnInit {

  role: string;
  isButtonVisible = false;
  holidayRequest: HolidayRequest = new HolidayRequest();
  constructor(private router: Router) { }

  ngOnInit() {
    this.checkRole();
  }
  change() {
    if (this.isButtonVisible == false)
      this.isButtonVisible = true;
    else this.isButtonVisible = false;
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PHARMACIST"){

      window.alert("Niste ulogovani kao farmaceut i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  sendHolidayRequest() {
    this.isButtonVisible = false;
  }
}
