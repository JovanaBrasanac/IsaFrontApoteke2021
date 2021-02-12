import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../model/Appointment';
import { MedicalRecordService } from '../service/medicalRecord.service';
import { Surgery } from '../model/Surgery';
import { MedicalRecordEdit } from '../model/MedicalRecordEdit';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {

  appointments: Appointment[] = [];
  appointments1: Appointment[] = [];
  appointment: Appointment;
  usernameUlogovanog: string;
  role: string;

  surgeries: Surgery[] = [];
  surgeries1: Surgery[] = [];
  surgery: Surgery;
  medicalRecordEdit: MedicalRecordEdit;

  constructor(private router: Router, private service: MedicalRecordService) { }

  ngOnInit() {
    this.checkRole();
    this.getAppointments();
    this.getSurgeries();
    this.getMedRec();
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PA"){

      window.alert("Niste ulogovani kao pacijent i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  getMedRec() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getMedicalRecordInfo(this.usernameUlogovanog).subscribe(
      data => {
        this.medicalRecordEdit = data;
      }, error => {
        console.log(error);
      }
    );
  }

  getAppointments() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    console.log(this.usernameUlogovanog);
    this.service.getAppointmentsMR(this.usernameUlogovanog).subscribe(
      data => {
        this.appointments = data;
        for (let a of this.appointments) {
          if (a.patient === this.usernameUlogovanog) {
            this.appointments1.push(a);
          }
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getSurgeries() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getSurgeries(this.usernameUlogovanog).subscribe(
      data => {
        this.surgeries = data;
        for (let a of this.surgeries) {
          if (a.patient === this.usernameUlogovanog) {
            this.surgeries1.push(a);
          }
        }
      }, error => {
        console.log(error);
      }
    );
  }
}
