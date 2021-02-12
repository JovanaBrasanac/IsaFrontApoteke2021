import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/Patient';
import { Appointment } from '../model/Appointment';

@Injectable({
    providedIn: 'root'
})

export class RequestService {

    constructor(private http: HttpClient) { }

    getRequest() {
        return this.http.get<Patient[]>('http://localhost:8080/api/requests');
    }

    getRequestA() {
        return this.http.get<Appointment[]>('http://localhost:8080/getAppointmentRequests');
    }

    getRequestA2() {
        return this.http.get<Appointment[]>('http://localhost:8080/api/all-requestAppointments/' + sessionStorage.getItem("authenticatedUser"));
    }

    deleteRequest(patient: Patient) {
        return this.http.post('http://localhost:8080/api/deny-request', patient);

    }

    acceptRequest(patient: Patient) {
        return this.http.post('http://localhost:8080/api/accept-request', patient);

    }

    sendMessage(message: String, email: string) {
        return this.http.post('http://localhost:8080/api/deny-request-message/' + email, message);
    }
}