import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../model/Appointment';
import { Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-already-created-appointments',
  templateUrl: './already-created-appointments.component.html',
  styleUrls: ['./already-created-appointments.component.css']
})
export class AlreadyCreatedAppointmentsComponent implements OnInit {

  appointments: Appointment[] = [];
  usernameUlogovanog: string;
  role: string;

  everySecond: Observable<number> = timer(0, 1000);
  private subscription: Subscription;

  constructor(private router: Router, private appService: AppointmentService) { }

  ngOnInit() {
    this.checkRole();
    this.subscription = this.everySecond.subscribe((seconds) => {
      this.getAlreadyCreatedAppointments();
    })
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PA"){

      window.alert("Niste ulogovani kao pacijent i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  getAlreadyCreatedAppointments() {
    this.appService.getAlreadyCreatedAppointments().subscribe(
      data => {
        this.appointments = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  scheduleApp(app: Appointment) {
    this.usernameUlogovanog = sessionStorage.getItem("authenticatedUser");
    app.patient = this.usernameUlogovanog;
    this.appService.scheduleApp(app).subscribe(
      data => {
        alert("Uspešno zakazan pregled.");
        this.router.navigateByUrl("/patient-home-page");
      }, error => {
        console.log(error);
        alert('Pregled je već neko zakazao');
        this.router.navigateByUrl("/patient-home-page");
      }
    );
  }
}
