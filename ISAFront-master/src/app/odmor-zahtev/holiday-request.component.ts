import { Component, OnInit } from '@angular/core';
import { HolidayRequest } from '../model/HolidayRequest';
import { HolidayRequestString } from '../model/HolidayRequestString';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { HolidayRequestService } from '../service/holidayRequest.service';

@Component({
  selector: 'app-holiday-request',
  templateUrl: './holiday-request.component.html',
  styleUrls: ['./holiday-request.component.css']
})
export class HolidayRequestComponent implements OnInit {

  date1;
  date2;
  today = Date.now();
  isButtonVisible = false;
  holidayRequest: HolidayRequest = new HolidayRequest();
  jstoday = '';
  ymd: String[] = [];
  year: number;
  month: number;
  day: number;
  holidayRequestString: HolidayRequestString = new HolidayRequestString();
  isVisible = true;

  constructor(private service: HolidayRequestService,
    private parserFormatter: NgbDateParserFormatter) { this.isVisible = true; }

  ngOnInit() {
    this.isVisible = true;
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
    this.ymd = this.jstoday.split("-");
    this.year = Number(this.ymd[2]);
    this.month = Number(this.ymd[1]);
    this.day = Number(this.ymd[0]);
  }

  sendHolidayRequest() {

    this.holidayRequestString.dateStart = this.parserFormatter.format(this.date1);
    this.holidayRequestString.dateEnd = this.parserFormatter.format(this.date2);
    console.log(this.holidayRequestString);
    this.isButtonVisible = false;
    this.holidayRequest.username = sessionStorage.getItem("authenticatedUser");
    this.holidayRequestString.username = sessionStorage.getItem("authenticatedUser");

    console.log(this.holidayRequestString);
    this.service.newHolidayRequest(this.holidayRequestString).subscribe((result) => {
      this.isButtonVisible = false;
      alert("Zahtev je uspešno poslat administratoru klinike!");
      location.reload();
    })
    this.date1 = "";
    this.date2 = "";
  }

}
