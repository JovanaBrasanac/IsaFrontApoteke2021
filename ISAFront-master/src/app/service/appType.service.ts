import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/Patient';
import { Appointment } from '../model/Appointment';
import { AppointmentType } from '../model/AppointmentType';

@Injectable({
  providedIn: 'root'
})

export class AppTypeService {

  constructor(private http: HttpClient) { }

  addType(type: AppointmentType) {
    console.log(type.name)
    return this.http.post<Patient>('http://localhost:8080/add-appType', type)
  }

  getAllTypes() {
    return this.http.get<any>('http://localhost:8080/getAppointmentTypes');
  }

  deleteType(type: AppointmentType) {
    console.log(type.name)

    return this.http.post('http://localhost:8080/delete-type', type);
  }


  modifyType(type: AppointmentType, name: String) {
    return this.http.post('http://localhost:8080/changeTypeInfo/' + name, type);
  }

}