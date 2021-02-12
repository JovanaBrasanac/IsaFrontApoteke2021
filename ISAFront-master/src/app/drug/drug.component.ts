import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from '../service/medicalRecord.service';
import { Router } from '@angular/router';
import { PhamacyService } from '../service/pharmacy.service';
import { Pharmacy } from '../model/Pharmacy';
import { DrugReservation } from '../model/DrugReservation';
import { DrugService } from '../service/drug.service';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent implements OnInit {

  clinics: Pharmacy[] = [];
  drugRs: DrugReservation[];
  role: string;


  constructor(private router: Router, private clinicService: PhamacyService, private drugService: DrugService ) { }

  ngOnInit() {
    this.checkRole();
    this.getPharmacies();
    this.getDrugReservations();
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PA"){

      window.alert("Niste ulogovani kao pacijent i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  getPharmacies() {
    this.clinicService.getPharmacies().subscribe(
      data => {
        this.clinics = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getDrugReservations() {
    this.drugService.getDrugReservations().subscribe(
      data => {
        this.drugRs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  klinika(clinic: Pharmacy) {
    this.clinicService.pharmacy = clinic;
    this.clinicService.imeKlinike1 = clinic.name;
  }

  cancel(reservation: DrugReservation){

    console.log(reservation);
    
    this.drugService.cancelDrugReservation(reservation).subscribe(

      data => {
        this.getDrugReservations();
      }
  

    );
    
  }

}
