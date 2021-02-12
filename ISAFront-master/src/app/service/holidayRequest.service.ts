import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HolidayRequestString } from '../model/HolidayRequestString';
import { HolidayRequest } from '../model/HolidayRequest';

@Injectable({
  providedIn: 'root'
})
export class HolidayRequestService {

  constructor(private http: HttpClient) { }

  newHolidayRequest(holidayRequestString: HolidayRequestString) {
    console.log(holidayRequestString);

    return this.http.post('http://localhost:8080/api/holiday-request', holidayRequestString);
  }

  getRequests(username: String) {
    return this.http.get<any>('http://localhost:8080/getHolidayRequests2/' + username);
  }

  change(holidayreq: HolidayRequest, message: String) {
    console.log(holidayreq);
    return this.http.post('http://localhost:8080/changeConfirmation/' + message, holidayreq);
  }
}