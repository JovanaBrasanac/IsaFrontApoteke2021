import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Drug } from '../model/Drug';
import { Diagnosis } from '../model/Diagnosis';
import { ClinicCenterAdministrator } from '../model/ClinicCenterAdministrator';

@Injectable({
    providedIn: 'root'
})
export class ClinicCenterAdministratorService {

    constructor(private http: HttpClient) { }

    newAdmin(admin: Object) {
        console.log(admin);
        return this.http.post('http://localhost:8080/api/add-system-admin', admin);

    }

    newDrug(drug: Drug) {
        console.log(drug);
        return this.http.post('http://localhost:8080/api/add-drug', drug);
    }

    newDiagnosis(diagnosis: Diagnosis) {
        console.log(diagnosis);
        return this.http.post('http://localhost:8080/api/add-diagnosis', diagnosis);
    }

    getLoginAdmin(user) {
        return this.http.get<ClinicCenterAdministrator>('http://localhost:8080/api/get-admin/' + user);
    }

    setNewPassword(password, admin) {
        return this.http.get<ClinicCenterAdministrator>('http://localhost:8080/api/set-password-admin/' + password + '/' + admin);
    }
}