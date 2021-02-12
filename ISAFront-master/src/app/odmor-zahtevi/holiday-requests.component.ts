import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HolidayRequestService } from '../service/holidayRequest.service';
import { HolidayRequest } from '../model/HolidayRequest';
import { HolidayRequestString } from '../model/HolidayRequestString';
import { MatTableDataSource } from '@angular/material';
import { User } from '../model/User';
import { timer, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-holiday-requests',
  templateUrl: './holiday-requests.component.html',
  styleUrls: ['./holiday-requests.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HolidayRequestsComponent implements OnInit {
  user: User = new User();

  everySecond: Observable<number> = timer(0, 5000);
  private subscription: Subscription;

  reqs: HolidayRequest[] = [];
  newReq: HolidayRequest = new HolidayRequest();
  isButtonVisible = false;
  message: String = "";
  role: string;

  constructor(private service: HolidayRequestService, private router: Router) { }
  dataSource = new MatTableDataSource(this.reqs);
  
  ngOnInit(): void {

    this.checkRole();
    this.getReqs();
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PharmAdmin"){

      window.alert("Niste ulogovani kao admin apoteke i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  confirm(req: HolidayRequest) {
    req.confirmed = true;
    this.service.change(req, "Prihvaćen zahtev").subscribe(
      data => {
        this.getReqs();
        location.reload();
      }, error => {
        alert('Neko je već izmenio zahtev!');
        console.log(error);
      }
    );
  }

  reject(req: HolidayRequest) {
    this.isButtonVisible = true;
  }

  reject2(req: HolidayRequest) {
    req.confirmed = false;
    this.service.change(req, this.message).subscribe(
      data => {
        this.getReqs();
        location.reload();
      }, error => {
        console.log(error);
        alert('Neko je već izmenio zahtev!');
      }
    );
  }

  getReqs() {
    this.user.username = sessionStorage.getItem("authenticatedUser");
    this.service.getRequests(this.user.username).subscribe(
      data => {
        this.reqs = data;
        console.log(data[0].confirmed);
        this.dataSource = new MatTableDataSource(this.reqs);
      }, error => {
        console.log(error);
      }
    )
  }
  columnsToDisplay = ['dateEnd', 'dateStart','username'];
}
