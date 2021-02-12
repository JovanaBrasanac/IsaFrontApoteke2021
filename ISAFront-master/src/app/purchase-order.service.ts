import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pharmacy } from './model/Pharmacy';
import { PurchaseOrder } from './model/PurchaseOrder';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private http: HttpClient) { }

  getAllOrders(pharmacy: Pharmacy) {
    return this.http.get<any>('http://localhost:8080/getPurchaseOrders/' + pharmacy.id);
  }

  getOffers(PO: PurchaseOrder) {
    return this.http.get<any>('http://localhost:8080/getPurchaseOffers/' + PO.id);
  }

}
