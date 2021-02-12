import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { PatientService } from '../service/patient.service';
import { Patient } from '../model/Patient';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Surgery } from '../model/Surgery';
import { SurgeryServiceService } from '../service/surgery-service.service';

@Component({
  selector: 'app-new-surgery',
  templateUrl: './new-surgery.component.html',
  styleUrls: ['./new-surgery.component.css']
})
export class NewSurgeryComponent implements OnInit {

  date1;
  today = Date.now();
  isButtonVisible = false;
  jstoday = '';
  ymd: String[] = [];
  year: number;
  month: number;
  day: number;
  isVisible = true;
  patients: Patient[];
  surgery: Surgery = new Surgery();
  selectedTime: String = '';
  constructor(public fb: FormBuilder, private parserFormatter: NgbDateParserFormatter,
    private PatientService: PatientService,
    private service: SurgeryServiceService) { }

  patientsForm = this.fb.group({
    name: ['']
  })
  patientSel: string = '';
  patient: string = "";
  form = new FormGroup({
    date: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  valueTime: any = [
    '10-12h',
    '12-14h',
    '14-16h',
    '16-18h'

  ];
  ngOnInit() {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
    this.ymd = this.jstoday.split("-");
    this.year = Number(this.ymd[2]);
    this.month = Number(this.ymd[1]);
    this.day = Number(this.ymd[0]);
    this.getPatients();
    this.patient = sessionStorage.getItem('clickedPatient');
  }

  onSubmit() {
    console.log(this.date1);
    this.surgery.patient = this.patient;
    this.surgery.doctorSurgery = sessionStorage.getItem('authenticatedUser');
    console.log(this.selectedTime)
    if (this.selectedTime == '10-12h')
      this.surgery.date = this.parserFormatter.format(this.date1) + 'T10:00';
    else if (this.selectedTime == '12-14h')
      this.surgery.date = this.parserFormatter.format(this.date1) + 'T12:00';
    else if (this.selectedTime == '14-16h')
      this.surgery.date = this.parserFormatter.format(this.date1) + 'T14:00';
    else
      this.surgery.date = this.parserFormatter.format(this.date1) + 'T16:00';
    console.log(this.surgery);

    this.service.addSurgery(this.surgery).subscribe((result) => {
      alert("Uspešno dodato!");
      this.surgery = new Surgery();
      window.location.href = 'http://localhost:4200/pharmacistHomePage';
    });

  }

  selectChangeHandler(event: any) {
    this.patientSel = event.target.value;
  }
  inputChangeHandler(event: any) {
    this.selectedTime = event.target.value;
  }
  getPatients() {
    this.PatientService.getAllPatients().subscribe(
      data => {
        this.patients = data;
      }, error => {
        console.log(error);
      }
    )
  }
}
