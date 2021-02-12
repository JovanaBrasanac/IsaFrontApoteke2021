import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/Patient';
import { Doctor } from '../model/Doctor';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }


  register(patient: Patient) {
    console.log(patient.address)
    return this.http.post<Patient>('http://localhost:8080/register', patient)
  }

  getAllPatients() {
    return this.http.get<any>('http://localhost:8080/pacijenti');
  }

  getPatient(username: string) {
    return this.http.get<any>('http://localhost:8080/pacijent/' + username);
  }

  changePatientInfo(patient: Patient) {
    return this.http.post<Patient>('http://localhost:8080/changePatientInfo', patient)
  }

  getDoctor(username: string) {
    return this.http.get<Doctor>('http://localhost:8080/osoblje/' + username);
  }

  changeDoctorInfo(doctor: Doctor) {
    return this.http.post<Doctor>('http://localhost:8080/osobljePromjena', doctor)
  }

  confirmAccount(token: String) {
    return this.http.get<Patient>('http://localhost:8080/confirmAccount/' + token)
  }

}