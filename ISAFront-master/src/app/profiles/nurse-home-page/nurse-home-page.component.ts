import { Component, OnInit } from '@angular/core';

import { formatDate } from '@angular/common';
import { NurseService } from 'src/app/service/nurse.service';
import { HolidayRequest } from 'src/app/model/HolidayRequest';
import { HolidayRequestString } from 'src/app/model/HolidayRequestString';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nurse-home-page',
  templateUrl: './nurse-home-page.component.html',
  styleUrls: ['./nurse-home-page.component.css']
})
export class NurseHomePageComponent implements OnInit {

  isButtonVisible = false;
  rolaUlogovanog: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.rolaUlogovanog = sessionStorage.getItem("authenticatedUserRole");
    if (this.rolaUlogovanog != "NURSE") {
      this.router.navigate(['/login']);
    }
  }

  change() {
    this.isButtonVisible = !this.isButtonVisible;
  }

}
