import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Appointment } from '../model/Appointment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Patient } from '../model/Patient';
import { PatientService } from '../service/patient.service';
import { RequestAppointmentService } from '../service/requestAppointment.service';
import { Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
 // styleUrls: ['../klinika/clinic.component.css']
})
export class NewAppointmentComponent implements OnInit {
  appointment: Appointment = new Appointment();
  constructor(public fb: FormBuilder, private service: PatientService, private rAservice: RequestAppointmentService,
    private router: Router, private parserFormatter: NgbDateParserFormatter,) { }
  patients: Patient[];
  selectedTime: String = '';
  valueTime: any = [
    '10-12h',
    '12-14h',
    '14-16h',
    '16-18h'

  ];
  date1;
  today = Date.now();
  isButtonVisible = false;
  jstoday = '';
  ymd: String[] = [];
  year: number;
  month: number;
  day: number;
  isVisible = true;
  patient: string = "";

  form = new FormGroup({
    date: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  patientSel: string = '';

  selectChangeHandler(event: any) {
    this.patientSel = event.target.value;
  }
  onSubmit() {
    if (this.selectedTime == '10-12h')
      this.appointment.date = this.parserFormatter.format(this.date1) + 'T10:00';
    else if (this.selectedTime == '12-14h')
      this.appointment.date = this.parserFormatter.format(this.date1) + 'T12:00';
    else if (this.selectedTime == '14-16h')
      this.appointment.date = this.parserFormatter.format(this.date1) + 'T14:00';
    else
      this.appointment.date = this.parserFormatter.format(this.date1) + 'T16:00';
    console.log(this.appointment);

    this.appointment.duration = 2;
    this.appointment.patient = this.patientSel;
    this.appointment.doctorUsername = sessionStorage.getItem('authenticatedUser');
    this.rAservice.addrequestAppointment(this.appointment).subscribe(
      data => {
        alert("Zahtev za pregled je uspešno poslat administratoru");
        this.router.navigateByUrl("/pharmacistHomePage");
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
    this.ymd = this.jstoday.split("-");
    this.year = Number(this.ymd[2]);
    this.month = Number(this.ymd[1]);
    this.day = Number(this.ymd[0]);
    this.getPatients();
    this.patientSel = sessionStorage.getItem('clickedPatient');
    console.log(this.patientSel);
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
}
