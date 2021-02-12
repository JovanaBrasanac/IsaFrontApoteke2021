import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinic-admin-home-page',
  templateUrl: './clinic-admin-home-page.component.html',
  styleUrls: ['./clinic-admin-home-page.component.css']
})
export class ClinicAdminHomePageComponent implements OnInit {

  role:string;

  constructor(private router: Router) { }

  ngOnInit() {

    this.checkRole();
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PharmAdmin"){

      window.alert("Niste ulogovani kao admin apoteke i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

}
