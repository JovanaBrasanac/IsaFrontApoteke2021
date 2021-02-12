import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { Patient } from '../model/Patient';
import { ActivatedRoute, Params } from '@angular/router';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  usernameUlogovanog: string;
  patient: Patient = new Patient;
  private token: string;

  constructor(private patientService: PatientService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params['token']);
      this.token = params['token'];
    });

    this.confirmAcc();
  }

  confirmAcc() {
    this.patientService.confirmAccount(this.token).subscribe(
      data => {
        this.patient = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
