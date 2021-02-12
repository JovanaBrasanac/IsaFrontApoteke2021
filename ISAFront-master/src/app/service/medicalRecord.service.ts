import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientRatedDoctor } from '../model/PatientRatedDoctor';
import { PatientRatedClinic } from '../model/PatientRatedClinic';
import { MedicalRecordEdit } from '../model/MedicalRecordEdit';

@Injectable({
    providedIn: 'root'
})
export class MedicalRecordService {

    constructor(private http: HttpClient) { }

    getAppointments(username: String) {

        return this.http.get<any>('http://localhost:8080/getAppointments/' + username);
    }

    getAppointmentsNonF(username: String) {

        return this.http.get<any>('http://localhost:8080/getAppointmentsNonF/' + username);
    }

    getUnfinishedAppointments(username: String) {

        return this.http.get<any>('http://localhost:8080/getAppointmentsUnfinished/' + username);
    }

    getUnfinishedSurgeries(username: String) {

        return this.http.get<any>('http://localhost:8080/getSurgeriesUnfinished/' + username);
    }

    getAllAppointments(username) {

        return this.http.get<any>('http://localhost:8080/api/all-patient-appointment/' + username);
    }

    getAppointmentPatient(username: String, doctor: String) {
        return this.http.get<any>('http://localhost:8080/get-patient-appointments/' + username + '/' + doctor);
    }

    getAppointmentsMR(username: String) {

        return this.http.get<any>('http://localhost:8080/getAppointmentsMR/' + username);
    }

    getSurgeries(username: String) {

        return this.http.get<any>('http://localhost:8080/getSurgeries/' + username);
    }

    getDoctorsForRate(username: String) {
        return this.http.get<any>('http://localhost:8080/getDoctorsForRate/' + username);
    }

    getRate(username: String) {
        return this.http.get<any>('http://localhost:8080/getRate/' + username);
    }

    getClinicsForRate(username: String) {
        return this.http.get<any>('http://localhost:8080/getPharmacysForRate/' + username);
    }

    rateChange(prd: PatientRatedDoctor) { 
        return this.http.post('http://localhost:8080/rateChange', prd);
    }

    rateChange1(prclinic: PatientRatedClinic) { 
        return this.http.post('http://localhost:8080/rateChangePharmacy', prclinic);
    }

    getMedicalRecordInfo(patient) {
        return this.http.get<MedicalRecordEdit>('http://localhost:8080/api/get-medical-record-info/' + patient);
    }
    setMedicalRecordInfo(medicalRecord) {
        return this.http.post<MedicalRecordEdit>('http://localhost:8080/api/set-medical-record-info', medicalRecord);
    }

    deleteAppointment(username: String) {

        console.log("primljeni ID JE:" + username);
        return this.http.get<any>('http://localhost:8080/deleteApp/' + username);
    }

    cancelAppointment(username: String) {

        console.log("primljeni cancel ID JE:" + username);
        return this.http.get<any>('http://localhost:8080/cancelApp/' + username);
    }

}