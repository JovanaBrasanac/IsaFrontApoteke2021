import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MedicalRecordEdit } from '../model/MedicalRecordEdit';
import { MedicalRecordService } from '../service/medicalRecord.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-edit-medical-record',
  templateUrl: './edit-medical-record.component.html',
  styleUrls: ['./edit-medical-record.component.css']
})
export class EditMedicalRecordComponent implements OnInit {

  constructor(private service: MedicalRecordService) { }

  medicalRecord: MedicalRecordEdit = new MedicalRecordEdit();
  form = new FormGroup({
    bloodType: new FormControl('', Validators.required),
    diopter: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required)
  })
  patientUsername: string = "";
  ngOnInit() {
    this.patientUsername = sessionStorage.getItem('clickedPatient');
    this.getMedicalRecord();
  }

  getMedicalRecord() {
    this.service.getMedicalRecordInfo(this.patientUsername).subscribe(
      data => {
        this.medicalRecord = data;
        console.log(this.medicalRecord);
      });
  }

  onSubmit() {
    this.service.setMedicalRecordInfo(this.medicalRecord).subscribe(
      data => {
        this.medicalRecord = data;
        alert('Medicinaki izvestaj je izmenjen!.');
        window.location.href = 'http://localhost:4200/pharmacistHomePage';
      }
    );
  }

}
