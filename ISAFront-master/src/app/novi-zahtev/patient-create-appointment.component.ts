import { Component, OnInit } from '@angular/core';
import { PhamacyService } from '../service/pharmacy.service';
import { Doctor } from '../model/Doctor';
import { Appointment } from '../model/Appointment';
import { RequestAppointmentService } from '../service/requestAppointment.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-patient-create-appointment',
  templateUrl: './patient-create-appointment.component.html',
  styleUrls: ['./patient-create-appointment.component.css']
})
export class PatientCreateAppointmentComponent implements OnInit {

  imeKlinike: string;
  datumZakazivanja: string;
  vremeZakazivanja: string;
  doctor: Doctor;
  appointment: Appointment = new Appointment();
  usernameUlogovanog: string;
  tipPregleda: string;

  constructor(private clinicService: PhamacyService, private rAservice: RequestAppointmentService,private Aservice: AppointmentService, private router: Router) { }

  ngOnInit() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.imeKlinike = this.clinicService.imeKlinike1;
    this.tipPregleda = this.clinicService.tipPregleda;
    this.datumZakazivanja = this.clinicService.datumZakazivanja1;
    this.vremeZakazivanja = this.clinicService.vremeZakazivanja;
    this.doctor = this.clinicService.doctor;
    this.appointment.doctorUsername = this.doctor.username;
    this.appointment.date = this.datumZakazivanja + "T" + this.vremeZakazivanja;
    this.appointment.patient = this.usernameUlogovanog;
    this.appointment.type = this.tipPregleda;
    console.log(this.appointment.doctorUsername);
    console.log(this.appointment.patient);
  }

  onSubmit() {

    this.rAservice.addrequestAppointmentFromPatient(this.appointment).subscribe(
      data => {
        alert("Uspesno zakazan pregled!");
        this.router.navigateByUrl("/patient-home-page");
      }, error => {
        alert("Neko je već rezervisao taj termin. Odaberite drugog doktora ili drugi datum!");
        this.router.navigateByUrl("/pharmacies");
        console.log(error);
      }
    );
  }
}
