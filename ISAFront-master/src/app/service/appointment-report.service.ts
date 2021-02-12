import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportAppointment } from '../model/ReportAppointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentReportService {

  constructor(private http: HttpClient) { }

  getDiagnosisService() {
    return this.http.get<any>('http://localhost:8080/api/get-diagnosis');
  }
  getDrugsService() {
    return this.http.get<any>('http://localhost:8080/api/get-drugs');
  }

  setReport(reportApp: Object) {
    return this.http.post('http://localhost:8080/api/set-app-report', reportApp);
  }

  getOldAppointmentReport(doctor) {
    return this.http.get<any>('http://localhost:8080/api/get-old-app-report/' + doctor);
  }

  getAppReportInfo(id) {
    return this.http.get<ReportAppointment>('http://localhost:8080/api/get-report-info/' + id)
  }
}
