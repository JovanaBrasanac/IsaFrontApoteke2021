import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pharmacy } from '../model/Pharmacy';
import { Doctor } from '../model/Doctor';
import { Promotion } from '../model/Promotion';
import { PriceList } from '../model/PriceList';

@Injectable({
  providedIn: 'root'
})
export class PhamacyService {

  private baseUrl = 'http://localhost:8080/api';
  imeKlinike1: string;
  datumZakazivanja1: string;
  vremeZakazivanja: string;
  tipPregleda: string;
  doctor: Doctor;
  imeApoteke: string;
  idApoteke: number;
  pharmacy: Pharmacy;

  constructor(private http: HttpClient) { }

  getPharmacy(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPharmacy(pharmacy: Object) {
    console.log("nova apoteka" + JSON.stringify(pharmacy))
    return this.http.post('http://localhost:8080/api/add-pharmacy', pharmacy);
  }

  getPharmacies() {
    return this.http.get<Pharmacy[]>('http://localhost:8080/api/get-pharmacys');
  }

  getSearchPharmacies(searchDate: String, searchType: String) {
    console.log("USAO U getSearchPharmacies " + searchDate);
    return this.http.get<Pharmacy[]>('http://localhost:8080/api/get-search-pharmacys/' + searchDate + "/" + searchType);
  }

  getSearchDoctors(searchDate: string, imeKlinike: string, tipPregleda: String) {
    return this.http.get<Doctor[]>('http://localhost:8080/api/get-search-doctors/' + searchDate + "/" + imeKlinike + "/" + tipPregleda);
  }

  setMinTime(username: String) {
    return this.http.get<Doctor>('http://localhost:8080/api/minTime/' + username);
  }

  setMaxTime(username: String) {
    return this.http.get<Doctor>('http://localhost:8080/api/maxTime/' + username);
  }

  changePharmacyData(pharmacy: Pharmacy, name: String) {
    return this.http.post('http://localhost:8080/PharmacyChangeInfo/' + name, pharmacy);
  }

  getAppTypes() {
    return this.http.get<any>('http://localhost:8080/getAppointmentTypes');
  }

  getDrugsPharmacy() {
    this.imeApoteke = this.pharmacy.name;
    this.idApoteke = this.pharmacy.id;
    return this.http.get<any>('http://localhost:8080/api/getMedications/' + this.pharmacy.id);
  }

  getDrugsPharmacy2(pharmacy: Pharmacy) {
    return this.http.get<any>('http://localhost:8080/api/getMedications/' + pharmacy.id);
  }

  getPromotionsPharmacy() {
    return this.http.get<any>('http://localhost:8080/api/getPromotions/' + this.pharmacy.id);
  }

  newPromotion(promotion: Promotion) {

    return this.http.post<Promotion>('http://localhost:8080/api/add-promotion/' + sessionStorage.getItem("authenticatedUser"), promotion);
  }

  priceUpdate(priceList: PriceList) {
    return this.http.post<PriceList>('http://localhost:8080/changePrice', priceList);
  }

}