import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurgeryServiceService {

  constructor(private http: HttpClient) { }

  addSurgery(surgery: Object) {
    console.log(surgery);
    return this.http.post('http://localhost:8080/api/new-surgery', surgery);
  }
}
