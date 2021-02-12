import { Component, OnInit, NgModule } from '@angular/core';
import { PhamacyService } from '../service/pharmacy.service';
import { Doctor } from '../model/Doctor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@NgModule({
  imports: [BrowserModule, FormsModule, Ng2SearchPipeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  role: string;
  searchText;
  imeKlinike: string;
  datumZakazivanja: string;
  tipPregleda: string;
  doctors: Doctor[] = [];
  selectTimeClicked: boolean;
  selectedDoctor: Doctor;
  minVreme: String;
  maxVreme: String;
  myDate = new Date().toJSON("yyyy/MM/dd HH:mm");
  now: string;
  upozorenjeZaRadnoVreme: boolean;

  constructor(private clinicService: PhamacyService, private router: Router) { }

  ngOnInit() {
    this.checkRole();
    this.imeKlinike = this.clinicService.imeKlinike1;
    this.datumZakazivanja = this.clinicService.datumZakazivanja1;
    this.tipPregleda = this.clinicService.tipPregleda;
    console.log(this.imeKlinike);
    console.log(this.datumZakazivanja);
    this.getSearchDoctors();
    this.upozorenjeZaRadnoVreme = false;
    this.selectTimeClicked = false;
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PA"){

      window.alert("Niste ulogovani kao pacijent i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  getSearchDoctors() {
    this.clinicService.getSearchDoctors(this.datumZakazivanja, this.imeKlinike, this.tipPregleda).subscribe(
      data => {
        this.doctors = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  addTimeForm(doctor: Doctor) {
    this.now = this.myDate.split("T")[1].split(":")[0] + ":" + this.myDate.split("T")[1].split(":")[1];
    this.selectTimeClicked = true;
    this.selectedDoctor = doctor;
    this.minVreme = this.selectedDoctor.pocetakRadnogVremena;
    this.maxVreme = this.selectedDoctor.krajRadnogVremena;
  }

  redirectToNewAppointment() {
    this.clinicService.imeKlinike1 = this.imeKlinike;
    this.clinicService.datumZakazivanja1 = this.datumZakazivanja;
    this.clinicService.vremeZakazivanja = this.now;
    this.clinicService.doctor = this.selectedDoctor;
    this.clinicService.tipPregleda = this.tipPregleda;
    if (+this.clinicService.vremeZakazivanja.split(":")[0] >= +this.minVreme.split(":")[0] && +this.clinicService.vremeZakazivanja.split(":")[0] < +this.maxVreme.split(":")[0]) {
      this.router.navigateByUrl("/patient-create-appointment");
      this.upozorenjeZaRadnoVreme = false;
    }
    else {
      this.upozorenjeZaRadnoVreme = true;
    }
    console.log(+this.minVreme.split(":")[0]);
    console.log(this.maxVreme.split(":")[0]);
    console.log(+this.clinicService.vremeZakazivanja.split(":")[0]);
  }

}
