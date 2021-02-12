import { Component, OnInit } from '@angular/core';
import { Promotion } from '../model/Promotion';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PhamacyService } from '../service/pharmacy.service';
import { Router } from '@angular/router';
import { ClinicAdministratorService } from '../service/clinicAdministrator.service';
import { Pharmacy } from '../model/Pharmacy';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-promotion',
  templateUrl: './new-promotion.component.html',
  styleUrls: ['./new-promotion.component.css']
})
export class NewPromotionComponent implements OnInit {

  date1: NgbDateStruct;
  promotion: Promotion = new Promotion();
  description: string;
  pharmacy: Pharmacy;
  username: String;
  role: string;

  constructor(private parserFormatter: NgbDateParserFormatter, private pharmacyservice: PhamacyService,private router: Router, private CAservice: ClinicAdministratorService) { }

  ngOnInit() {

    this.checkRole();
    this.getMyClinic();
  }

  form = new FormGroup({
    date: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PharmAdmin"){

      window.alert("Niste ulogovani kao admin apoteke i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  getMyClinic(){

    this.username = sessionStorage.getItem("authenticatedUser");
    this.CAservice.getMyClinic(this.username).subscribe(

      data=>{

        this.pharmacy = data;
      }

    );

  }

  onSubmit() {

    this.promotion.date = this.parserFormatter.format(this.date1) + 'T00:00';
    this.promotion.description = this.description;
    console.log("Opis akcije" + this.description);
    console.log("Datum akcije" + this.promotion.date);
    this.pharmacyservice.newPromotion(this.promotion).subscribe(
      data => {
        alert("Uspesno dodata akcija");
        this.router.navigateByUrl("/pharmacyadmin-home-page");
      }, error => {
        console.log(error);
      }
    );
  }

}
