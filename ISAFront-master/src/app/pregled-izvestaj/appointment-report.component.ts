import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Appointment } from '../model/Appointment';
import { AppointmentReportService } from '../service/appointment-report.service';
import { Diagnosis } from '../model/Diagnosis';
import { Drug } from '../model/Drug';
import { Recipe } from '../model/Recipe';
import { ReportAppointment } from '../model/ReportAppointment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment-report',
  templateUrl: './appointment-report.component.html',
  styleUrls: ['./appointment-report.component.css']
})
export class AppointmentReportComponent implements OnInit {

  form = new FormGroup({
    description: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    diagnosis: new FormControl('', Validators.required)
  })
  form2: FormGroup;
  appointment: Appointment = new Appointment();
  diagnoses: Diagnosis[] = [];
  selDiagnosisID: String = "";
  selDiagnosis: Diagnosis = new Diagnosis();
  drugs: Drug[] = [];
  recipe: Recipe = new Recipe();
  reportAppointment: ReportAppointment = new ReportAppointment();
  formVisible: boolean = true;
  scheduleVisible: boolean = false;

  constructor(private service: AppointmentReportService,
    private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.form2 = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
  }
  ngOnInit() {
    this.getDiagnosis();
    this.getDrugs();
    this.formVisible = true;
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form2.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit() {
    this.formVisible = false;
    this.scheduleVisible = true;
    let drugs = this.form2.get('checkArray').value;
    this.recipe.drugs = drugs;
    console.log(this.recipe);
    console.log(drugs);
    console.log(this.selDiagnosis);
    this.appointment.id = this.route.snapshot.paramMap.get('id');
    console.log(this.appointment);
    this.reportAppointment.appointment = this.appointment;
    this.reportAppointment.diagnosis = this.selDiagnosis;
    this.reportAppointment.recipe = this.recipe;
    this.service.setReport(this.reportAppointment).subscribe(
      (result) => {
        alert('Uspešno!');
      }
    );
  }

  selectChangeHandler(event: any) {
    this.selDiagnosisID = event.target.value;
    console.log(this.selDiagnosisID);
    for (let d of this.diagnoses) {
      if (d.id == this.selDiagnosisID)
        this.selDiagnosis = d;
    }
  }

  getDiagnosis() {
    this.service.getDiagnosisService().subscribe(
      data => {
        console.log(data);
        this.diagnoses = data;
      });
  }

  getDrugs() {
    this.service.getDrugsService().subscribe(
      data => {
        this.drugs = data;
      }
    );
  }
}
