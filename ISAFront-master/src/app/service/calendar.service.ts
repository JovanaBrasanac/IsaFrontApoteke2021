import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../model/Appointment';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../model/CalendarEvent';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  appointments: Appointment[] = [];
  calendarEvents: any[] = [];
  constructor(private http: HttpClient) { }

  getAppointments(doctor) {
    return this.http.get<CalendarEvent[]>('http://localhost:8080/api/getAllAppointments/' + doctor);
  }
  getAppointmentsNurse(nurse) {
    return this.http.get<CalendarEvent[]>('http://localhost:8080/api/getAllAppointments-app/' + nurse);
  }


}
