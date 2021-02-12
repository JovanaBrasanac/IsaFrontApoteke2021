import { Component, OnInit } from '@angular/core';
import { Drug } from '../model/Drug';
import { DrugReservation } from '../model/DrugReservation';
import { Promotion } from '../model/Promotion';
import { DrugService } from '../service/drug.service';
import { PhamacyService } from '../service/pharmacy.service';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.css']
})
export class DrugListComponent implements OnInit {

  drugs: Drug[] = [];
  imeKlinike: string;
  idApoteke: number;
  res: DrugReservation;
  promotions: Promotion[];

  constructor(private clinicService: PhamacyService, private drugService: DrugService) { }

  ngOnInit() {

    this.imeKlinike = this.clinicService.pharmacy.name;
    this.idApoteke = this.clinicService.pharmacy.id;
    this.getDrugsPharmacy();
    this.getPromotionsPharmacy();

  }

  getDrugsPharmacy() {
    this.clinicService.getDrugsPharmacy().subscribe(
      data => {
        this.drugs = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getPromotionsPharmacy() {
    this.clinicService.getPromotionsPharmacy().subscribe(
      data => {
        this.promotions = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  reserve(drug: Drug){

    this.drugService.ReserveDrug(drug).subscribe(
      data => {
        this.res = data;
        console.log("Uspesno napravljena rezervacija leka: " + data.drug + data.patient);
       console.log("Uspesno napravljena rezervacija leka: " + data);
       this.getDrugsPharmacy();
      },
      error => {
        console.log(error);
      }
    )

  }

  pretplata(promotion: Promotion){

    this.drugService.pretplata(promotion).subscribe(
      data => {
        console.log("Uspesno ste pretplaceni");
        window.alert("Uspesno ste pretplaceni");
       this.getPromotionsPharmacy();
      },
      error => {
        console.log(error);
      }
    )

  }


}
