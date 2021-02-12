import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalRecordService } from '../service/medicalRecord.service';
import { Surgery } from '../model/Surgery';
import { Appointment } from '../model/Appointment';
import { Sort } from '@angular/material/sort';
import { Doctor } from '../model/Doctor';
import { PatientRatedDoctor } from '../model/PatientRatedDoctor';
import { Pharmacy } from '../model/Pharmacy';
import { PatientRatedClinic } from '../model/PatientRatedClinic';

@Component({
  selector: 'app-history-of-appointments',
  templateUrl: './history-of-appointments.component.html',
  styleUrls: ['./history-of-appointments.component.css']
})
export class HistoryOfAppointmentsComponent implements OnInit {

  appointments: Appointment[] = [];
  appointments1: Appointment[] = [];
  appointments2: Appointment[] = [];
  appointmentsUnfinished: Appointment[] = [];
  appointment: Appointment;
  usernameUlogovanog: string;
  doctorsForRate: Doctor[] = [];
  patientRatedDoctor: PatientRatedDoctor[] = [];
  patientRatedClinic: PatientRatedClinic[] = [];
  message: string;
  role: string;

  dermatology: Appointment[] = [];
  dermatology1: Appointment[] = [];
  dermatologyUnfinished: Appointment[] = [];
  surgeries1: Surgery[] = [];
  surgeries2: Surgery[] = [];
  surgery: Surgery;

  constructor(private router: Router, private service: MedicalRecordService) { }

  ngOnInit() {
    this.checkRole();
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.getAppointmentsFinished();
    this.getDermatologyFinished();
    this.getAppointmentsUnfinished();
    this.getDermatologyUnfinished();
    this.getRate();
    this.getClinicsForRate();
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PA"){

      window.alert("Niste ulogovani kao pacijent i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  rateChange(prd: PatientRatedDoctor) {
    console.log(prd.ocena);
    console.log(prd.doctor.firstName);
    prd.patientUsername = this.usernameUlogovanog;
    prd.doctorUsername = prd.doctor.username;
    console.log(prd.doctorUsername);

    this.service.rateChange(prd).subscribe((result) => {
      alert("Uspešno ocenjena " + prd.doctor.firstName);
      this.getRate();
    });
  }

  rateChange1(prclinic: PatientRatedClinic) {
    console.log(prclinic.ocena);
    console.log(prclinic.clinic.name);
    prclinic.patientUsername = this.usernameUlogovanog;
    prclinic.clinicName = prclinic.clinic.name;
    this.service.rateChange1(prclinic).subscribe((result) => {
      alert("Uspešno ocenjena " + prclinic.clinic.name);
      this.getClinicsForRate();
    });
  }

  getRate() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getRate(this.usernameUlogovanog).subscribe(
      data => {
        this.patientRatedDoctor = data;
      }, error => {
        console.log(error);
      }
    );
  }

  getClinicsForRate() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getClinicsForRate(this.usernameUlogovanog).subscribe(
      data => {
        this.patientRatedClinic = data;
      }, error => {
        console.log(error);
      }
    );
  }

  getAppointmentsFinished() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getAppointments(this.usernameUlogovanog).subscribe(
      data => {
        this.appointments = data.filter(clinic => clinic.type2.id == 1);
        for (let a of this.appointments) {
          console.log(a.patient);
          if (a.patient === this.usernameUlogovanog) {
            this.appointments1.push(a);
          }
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getAppointmentsUnfinished() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getAppointmentsNonF(this.usernameUlogovanog).subscribe(
      data => {
        this.appointmentsUnfinished = data.filter(clinic => clinic.type2.id == 1 && clinic.patient === this.usernameUlogovanog);
        for (let a of this.appointments) {
          console.log(a.patient);
          /*
          if (a.patient === this.usernameUlogovanog) {
            this.appointments1.push(a);
          }
          */
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getAppointments2() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getUnfinishedAppointments(this.usernameUlogovanog).subscribe(
      data => {
        this.appointments2 = data.filter(clinic => clinic.is);
        for (let a of this.appointments) {
          console.log(a.patient);
          if (a.patient === this.usernameUlogovanog) {
            this.appointments1.push(a);
          }
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getDermatologyFinished() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getAppointments(this.usernameUlogovanog).subscribe(
      data => {
        this.dermatology = data.filter(clinic => clinic.type2.id === 2);
        for (let a of this.dermatology) {
          console.log(a.patient);
          if (a.patient === this.usernameUlogovanog) {
            this.dermatology1.push(a);
          }
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getDermatologyUnfinished() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getUnfinishedAppointments(this.usernameUlogovanog).subscribe(
      data => {
        this.dermatologyUnfinished = data.filter(clinic => clinic.type2.id == 2 && clinic.patient === this.usernameUlogovanog);
        for (let a of this.dermatology) {
          console.log(a.patient);
          /*
          if (a.patient === this.usernameUlogovanog) {
            this.dermatology1.push(a);
          }
          */
        }
      }, error => {
        console.log(error);
      }
    );
  }

  delete(appointment: Appointment){

    
    this.service.deleteAppointment(appointment.id).subscribe(
      data=>{console.log(data);
      
        this.getAppointmentsUnfinished();
      }
    );
    
  }

  cancel(appointment: Appointment){

    
    this.service.cancelAppointment(appointment.id).subscribe(
      data=>{console.log(data);
      
        this.getDermatologyUnfinished();
      }
    );
    
  }
/*
  getSurgeries2() {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    this.service.getUnfinishedSurgeries(this.usernameUlogovanog).subscribe(
      data => {
        this.surgeries = data;
        for (let a of this.surgeries) {
          console.log(a.patient);
          if (a.patient === this.usernameUlogovanog) {
            this.surgeries1.push(a);
          }
        }
      }, error => {
        console.log(error);
      }
    );
  }
*/

  sortData(sort: Sort) {
    const data = this.appointments1.slice();
    if (!sort.active || sort.direction === '') {
      this.appointments1 = data;
      return;
    }

    this.appointments1 = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'duration': return compare(a.duration, b.duration, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        default: return 0;
      }


    });
  }

  sortData1(sort: Sort) {
    const data = this.surgeries1.slice();
    if (!sort.active || sort.direction === '') {
      this.surgeries1 = data;
      return;
    }

    this.surgeries1 = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        default: return 0;
      }


    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


