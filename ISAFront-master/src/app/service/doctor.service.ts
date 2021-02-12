import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HospitalRoom } from '../model/HospitalRoom';
import { Doctor } from '../model/Doctor';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {

  constructor(private http: HttpClient) { }


  deleteDoctor(doc: Doctor) {
    return this.http.post('http://localhost:8080/delete-doc', doc);
  }

  modifyDoctor(doctor: Doctor, name: String) {
    return this.http.post('http://localhost:8080/osobljePromjena/' + name, doctor);
  }

  addDoctor(doctor: Doctor, username: String) {
    console.log(doctor.username)

    return this.http.post<Doctor>('http://localhost:8080/add-doctor/' + username, doctor);
  }

  addDoctorDerm(doctor: Doctor, username: String) {
    console.log(doctor.username)

    return this.http.post<Doctor>('http://localhost:8080/add-doctorDerm/' + username, doctor);
  }

  getAllDoctors() {
    return this.http.get<any>('http://localhost:8080/doctors');
  }

  getAllDoctors2() {
    return this.http.get<any>('http://localhost:8080/doctors/' + sessionStorage.getItem("authenticatedUser"));
  }

  getAllDoctorsDerm() {
    return this.http.get<any>('http://localhost:8080/dermatologists/' + sessionStorage.getItem("authenticatedUser"));
  }
}