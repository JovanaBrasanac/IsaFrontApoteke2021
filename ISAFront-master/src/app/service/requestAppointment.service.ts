import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/Patient';
import { Appointment } from '../model/Appointment';
import { AvailableRoom } from '../model/AvailableRoom';

@Injectable({
  providedIn: 'root'
})

export class RequestAppointmentService {

  constructor(private http: HttpClient) { }

  addrequestAppointment(appointment: Appointment) {
    console.log(appointment.description + appointment.date + appointment.duration + appointment.patient + appointment.type)
    return this.http.post<Appointment>('http://localhost:8080/api/add-requestApp', appointment)
  }
  addrequestAppointmentF(appointment: Appointment) {
    console.log(appointment.pharmacy.id, appointment.description + appointment.date + appointment.duration + appointment.patient + appointment.type)
    return this.http.post<Appointment>('http://localhost:8080/api/add-requestAppFAST/' + sessionStorage.getItem("authenticatedUser"), appointment)
  }

  getAvailableRoomForOtherDate(appointment: Object) {
    console.log('usao u getAvailableRoomForOtherDate');
    console.log(appointment);
    return this.http.post<AvailableRoom>('http://localhost:8080/api/available-room-other-date-Appointment', appointment);
  }

  
  getSurgeriesService() {
    console.log("usao");
    return this.http.get<any>('http://localhost:8080/api/appR/' + sessionStorage.getItem('authenticatedUser'));
  }

  setRoom(appointment: Appointment) {
    return this.http.post<any>('http://localhost:8080//api/add-room-app', appointment);
  }

  setRoomOfFastAppointment(resRoom: Object) {
    console.log("usao u setRoomOfSurgery");
    console.log(resRoom);
    return this.http.post('http://localhost:8080/api/add-room-to-appointmentF', resRoom);
  }

  addrequestAppointmentFromPatient(appointment: Appointment) {
    console.log(appointment.description)
    return this.http.post<Appointment>('http://localhost:8080/addAppointment', appointment)
  }

  getAvailableDoctors(appointment: Appointment) {
    console.log("getAvailableDoctors");
    return this.http.post<any>('http://localhost:8080/api/availableDermatologists/'+ sessionStorage.getItem("authenticatedUser"), appointment);
  }

  getAllRooms() {
    return this.http.get<any>('http://localhost:8080/sale');
  }

}