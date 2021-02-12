import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClinicAdministrator } from '../model/ClinicAdministrator';
import { Pharmacy } from '../model/Pharmacy';
import { PriceList } from '../model/PriceList';
import { PriceList2 } from '../model/PriceList2';

@Injectable({
  providedIn: 'root'
})
export class ClinicAdministratorService {

  pharmacy: Pharmacy = new Pharmacy();

  constructor(private http: HttpClient) { }

  newAdmin(admin: Object, id: number) {
    console.log(admin);

    return this.http.post('http://localhost:8080/api/add-admin/' + id, admin);
  }

  getCadmin(username: string) {
    return this.http.get<ClinicAdministrator>('http://localhost:8080/cadmin/' + username);
  }

  changeAdminInfo(admin: ClinicAdministrator) {
    return this.http.post<ClinicAdministrator>('http://localhost:8080/adminChangeInfo', admin)
  }

  getMyClinic(username: String) {
    return this.http.get<Pharmacy>('http://localhost:8080/getMyClinic/' + username);
  }

  getPrices(pharmacy: Pharmacy) {
    return this.http.get<any>('http://localhost:8080/getPrices/' + pharmacy.id);
  }

  changePrice(price: PriceList2) {
    console.log(price.id);
    console.log(price.price);
    return this.http.post('http://localhost:8080/changePrice', price);
  }

  getAppointments() {
    return this.http.get<any>('http://localhost:8080/appointments');
  }

  getAppointmentsAdmin() {
    return this.http.get<any>('http://localhost:8080/getAppointmentsAdmin/' + sessionStorage.getItem('authenticatedUser'));
  }


}