import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Surgery } from '../model/Surgery';
import { ObjectUnsubscribedError } from 'rxjs';
import { AvailableRoom } from '../model/AvailableRoom';

@Injectable({
  providedIn: 'root'
})
export class SurgeryRoomService {

  constructor(private http: HttpClient) { }

  getAllRooms() {
    return this.http.get<any>('http://localhost:8080/sale');
  }

  getSurgeriesService() {
    console.log("usao");
    return this.http.get<any>('http://localhost:8080/api/surgeries-res-rooms/' + sessionStorage.getItem('authenticatedUser'));
  }

  getAvailableRooms(surgery: Object) {
    console.log("getAvailableRooms");
    return this.http.post<any>('http://localhost:8080/api/availableRooms', surgery);
  }

  getAvailableDoctors(surgery: Object) {
    console.log("usao u getAvailableDoctors");
    return this.http.post<any>('http://localhost:8080/api/availableDoctors', surgery);
  }

  setRoomOfSurgery(resRoom: Object) {
    console.log("usao u setRoomOfSurgery");
    console.log(resRoom);
    return this.http.post('http://localhost:8080/api/add-room-to-surgery', resRoom);
  }

  getAvailableRoomForOtherDate(surgery: Object) {
    console.log('usao u getAvailableRoomForOtherDate');
    console.log(surgery);
    return this.http.post<AvailableRoom>('http://localhost:8080/api/available-room-other-date', surgery);
  }

}
