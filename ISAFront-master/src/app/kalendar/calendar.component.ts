import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService } from '../service/calendar.service';
import { Appointment } from '../model/Appointment';
import { Observable, of } from 'rxjs';
import { CalendarEvent } from '../model/CalendarEvent';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  ngOnInit() {

    this.checkRole();
    this.getDates();
    console.log(this.calendarEvents);
  }

  title = 'easyfullcalendar';
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarEvents: any[] = [];

  role: string;
  myDate = new Date();
  todayString = "";
  header = {
    left: "timeGridDay,timeGridWeek,dayGridMonth",
    center: "title",
    right: "today,prevYear,prev,next,nextYear"
  }
  constructor(private calendarService: CalendarService,private router: Router, private datePipe: DatePipe) {
    this.todayString = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PHARMACIST"){

      window.alert("Niste ulogovani kao farmaceut i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  getDates() {
    let doctor = sessionStorage.getItem("authenticatedUser");
    let role = sessionStorage.getItem("authenticatedUserRole");
    if (role == 'DOC') {
      this.calendarService.getAppointments(doctor).subscribe(
        data => {
          this.calendarEvents = data;
          console.log(this.calendarEvents);
        });
    } else if (role == 'NURSE') {
      this.calendarService.getAppointmentsNurse(doctor).subscribe(
        data => {
          this.calendarEvents = data;
          console.log(this.calendarEvents);
        });
    }
  }

  handleDateClick(arg) {
    let role = sessionStorage.getItem("authenticatedUserRole");
    if (role == 'DOC') {
      var start = arg.event.start;
      var title = arg.event.title;
      var splittedTitle = title.split("\n");
      console.log(splittedTitle);
      var startString = start.toISOString();
      var splitted = startString.split("T");
      if (splitted[0] == this.todayString && splittedTitle[1] == "appointment" && splittedTitle[4] == "AVAILABLE") {
        alert('Pregled može početi');
        sessionStorage.setItem('clickedPatient', splittedTitle[5]);
        window.location.href = 'http://localhost:4200/appointment-report/' + splittedTitle[0];
      }
      else if (splittedTitle[4] == "FINISHED")
        alert('Pregled je završen');
      else if (splittedTitle[1] == "surgery")
        alert('Morate odabrani pregled');
      else
        alert('Morate odabrani današnji pregled');
    }
  }
}