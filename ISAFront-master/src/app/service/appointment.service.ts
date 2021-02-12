import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../model/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAlreadyCreatedAppointments() {
    return this.http.get<any>('http://localhost:8080/getAlreadyCreatedAppointments');
  }

  scheduleApp(appointment: Appointment) {
    console.log(appointment.description)
    return this.http.post<any>('http://localhost:8080/scheduleApp', appointment)
  }



}