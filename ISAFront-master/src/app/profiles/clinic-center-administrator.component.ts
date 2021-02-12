import { Component, OnInit } from "@angular/core";

import { Router } from '@angular/router';

import { Pharmacy } from '../model/Pharmacy';
import { ClinicCenterAdministrator } from '../model/ClinicCenterAdministrator';
import { ClinicCenterAdministratorService } from '../service/clinicalCenterAdmin.service';
import { Drug } from '../model/Drug';
import { Diagnosis } from '../model/Diagnosis';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './clinic-center-administrator.component.html',
    styleUrls: ['./clinic-center-administrator.component.css']
})

export class ClinicCenterAdministratorComponent implements OnInit {
    loginCCAdmin: ClinicCenterAdministrator = new ClinicCenterAdministrator();
    ccadmin: ClinicCenterAdministrator = new ClinicCenterAdministrator();
    clicked = false;
    drug: Drug = new Drug();
    diagnosis: Diagnosis = new Diagnosis();
    clickedDiagnoisis = false;
    clickedDrugs = false;
    paswordFormVisible: boolean = false;
    pageVisible: boolean = true;
    newPassword: String = "";
    predefAdmin: boolean = false;
    role: string;
    form = new FormGroup({
        newPassword: new FormControl('', Validators.required)

    })
    form1 = new FormGroup({
        drugName: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),

    })
    form2 = new FormGroup({
        diagnosisName: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)

    })
    form3 = new FormGroup({
        Username: new FormControl('', Validators.required),
        Password: new FormControl('', Validators.required),
        firstNameCA: new FormControl('', Validators.required),
        lastNameCA: new FormControl('', Validators.required),
        emailCA: new FormControl('', Validators.required),
        addressCA: new FormControl('', Validators.required),
        cityCA: new FormControl('', Validators.required),
        countryCA: new FormControl('', Validators.required),
        mobileNumberCA: new FormControl('', Validators.required),
        jmbgCA: new FormControl('', Validators.required),
    })
    constructor(private service: ClinicCenterAdministratorService,
        private router: Router) { }

    ngOnInit(): void {
        this.getClinicCenterAdmin();
        let user = sessionStorage.getItem('authenticatedUser');
        if (user == 'ccadmin')
            this.predefAdmin = true;
    }

    checkRole(){

        this.role = sessionStorage.getItem("authenticatedUserRole");
    
        console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));
    
        if(this.role !== "SYSADMIN"){
    
          window.alert("Niste ulogovani kao administrator sistema i nemate pristup ovoj stranici!");
          this.router.navigate(['/login']);
        }
    
      }

    clickedNewAdminchange() {
        this.clicked = true;
    }
    clickedNewAdmin() {
        this.clicked = false;
        this.clickedDiagnoisis = false;
        this.clickedDiagnoisis = false;
        console.log(this.ccadmin);

        this.service.newAdmin(this.ccadmin).subscribe((result) => {
            alert("Uspešno!");
        })
        this.ccadmin = new ClinicCenterAdministrator();
    }
    clickednewDrug() {
        this.clickedDrugs = true;
        this.clickedDiagnoisis = false;
        this.clicked = false;
    }
    clickednewDiagnosis() {
        this.clickedDiagnoisis = true;
        this.clickedDrugs = false;
        this.clicked = false;
    }
    newDrug() {
        this.clickedDrugs = false;
        this.clickedDiagnoisis = false;
        this.clicked = false;
        this.service.newDrug(this.drug).subscribe((result) => { alert("Uspešno!"); });
        this.drug = new Drug();
    }

    newDiagnosis() {
        this.clickedDiagnoisis = false;
        this.clickedDiagnoisis = false;
        this.clicked = false;
        this.service.newDiagnosis(this.diagnosis).subscribe((result) => { alert("Uspešno!"); });
        this.diagnosis = new Diagnosis();
    }

    getClinicCenterAdmin() {
        let user = sessionStorage.getItem("authenticatedUser");
        this.service.getLoginAdmin(user).subscribe(
            data => {
                this.loginCCAdmin = data;
                if (this.loginCCAdmin.firstLog == 0) {
                    this.paswordFormVisible = true;
                    this.pageVisible = false;
                }
                else
                    this.pageVisible = true;
            });
    }

    onSubmit() {
        this.service.setNewPassword(this.newPassword, sessionStorage.getItem("authenticatedUser")).subscribe(
            data => {
                this.paswordFormVisible = false;
                this.pageVisible = true;
                this.loginCCAdmin = data;

            }, error => {
                alert('Došlo je do greške!');
            });
    }
}