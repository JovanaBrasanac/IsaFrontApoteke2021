import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Drug } from '../model/Drug';
import { DrugReservation } from '../model/DrugReservation';
import { Promotion } from '../model/Promotion';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private http: HttpClient) { }

  getAllDrugs() {
    return this.http.get<any>('http://localhost:8080/lekovi');
  }
  

  getDrug(username: string) {
    return this.http.get<any>('http://localhost:8080/lek/' + username);
  }

  changePatientInfo(patient: Drug) {
    return this.http.post<Drug>('http://localhost:8080/changeDrugInfo', patient)
  }

  ReserveDrug(drug: Drug) {
    console.log("Medication reservation");
    return this.http.post<any>('http://localhost:8080/api/add-drugReservation/'+ sessionStorage.getItem("authenticatedUser"), drug);
  }

  getDrugReservations() {
    return this.http.get<DrugReservation[]>('http://localhost:8080/getDReservations/' + sessionStorage.getItem("authenticatedUser"));
  }


cancelDrugReservation(drug: DrugReservation) {
  return this.http.get<any>('http://localhost:8080/cancelDrugReservation/' + drug.id);
}

pretplata(promotion: Promotion) {
  console.log("Pretplata");
  return this.http.get<any>('http://localhost:8080/api/pretplatiSe/'+ promotion.id + '/' + sessionStorage.getItem("authenticatedUser"));
}

}
