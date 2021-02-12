import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/Patient';
import { PatientService } from '../service/patient.service';
import { Appointment } from '../model/Appointment';
import { Surgery } from '../model/Surgery';
import { MedicalRecordService } from '../service/medicalRecord.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-for-patients',
  templateUrl: './search-for-patients.component.html',
  styleUrls: ['./search-for-patients.component.css']
})
export class SearchForPatientsComponent implements OnInit {

  role: string;
  searchText;
  patients: Patient[] = [];
  selectedPatient: Patient = new Patient;
  isButtonVisible = false;
  isButtonVisible2 = false;
  appointments: Appointment[] = [];
  appointments1: Appointment[] = [];
  appointment: Appointment;
  surgeries: Surgery[] = [];
  surgeries1: Surgery[] = [];
  surgery: Surgery;

  constructor(private service: PatientService, private serviceMD: MedicalRecordService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.checkRole();
    this.getPatients();
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PHARMACIST"){

      window.alert("Niste ulogovani kao farmaceut i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  getPatients() {
    this.service.getAllPatients().subscribe(
      data => {
        this.patients = data;
      }, error => {
        console.log(error);
      }
    )
  }
  startApp(id) {
    this.router.navigate(['/appointment-report', id]);
  }
  change(patient: Patient) {
    this.selectedPatient = patient;
    sessionStorage.setItem('clickedPatient', patient.username);
    this.getAppointments(patient.username);
    this.getSurgeries(patient.username);
    if (this.isButtonVisible == false)
      this.isButtonVisible = true;
    else this.isButtonVisible = false;
    this.isButtonVisible2 = false;
  }

  viewMedRecord() {
    if (this.isButtonVisible2 == false)
      this.isButtonVisible2 = true;
    else this.isButtonVisible2 = false;
  }
  getAppointments(username: String) {
    let doctor = sessionStorage.getItem("authenticatedUser");
    this.serviceMD.getAppointmentPatient(username, doctor).subscribe(
      data => {
        this.appointments1 = data;
        this.serviceMD.getAllAppointments(username).subscribe(
          data => {
            this.appointments = data;
            console.log(this.appointments)
            console.log(this.appointments1)
            for (let todayApp of this.appointments1) {
              for (let app of this.appointments) {
                if (app.id == todayApp.id)
                  app.start = true;
              }
            }
            console.log(this.appointments);
          })
      }, error => {
        console.log(error);
      }
    );
  }

  getSurgeries(username: String) {
    this.serviceMD.getSurgeries(username).subscribe(
      data => {
        this.surgeries = data;
        for (let a of this.surgeries) {
          console.log(a.patient);
          if (a.patient === username) {
            this.surgeries1.push(a);
          }
        }
      }, error => {
        console.log(error);
      }
    );
  }
}
