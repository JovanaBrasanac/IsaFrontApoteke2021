import { Component, OnInit } from '@angular/core';
import { Appointment } from '../model/Appointment';
import { RequestService } from '../service/requests.service';

@Component({
  selector: 'app-request-holiday-view',
  templateUrl: './request-holiday-view.component.html',
  styleUrls: ['./request-holiday-view.component.css']
})
export class RequestHolidayViewComponent implements OnInit {

  requests: Appointment[] = [];
  constructor(private service: RequestService) { }

  ngOnInit() {
    this.getRequest();
  }

  getRequest() {
    this.service.getRequestA().subscribe(
      data => {
        this.requests = data;
      }, error => {
        console.log(error);
      }
    )
  }
}
