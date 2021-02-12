import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../model/User';
import { Pharmacy } from '../model/Pharmacy';
import { Sort } from '@angular/material/sort';
import { PhamacyService } from '../service/pharmacy.service';
import { DrugService } from '../service/drug.service';
import { Drug } from '../model/Drug';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  user1: User = new User();
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  rola: string;
  apoteka: string;
  lek: string;
  clinics1: Pharmacy[] = [];
  drugs: Drug[] = [];
  private isVisible = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private clinicService: PhamacyService,
    private drugService: DrugService) { }

  ngOnInit() {
    this.getPharmacies2();
    this.getDrugs2();
  }

  getPharmacies() {
    this.clinicService.getPharmacies().subscribe(
      data => {
        this.clinics1 = data.filter(clinic => clinic.name.includes(this.apoteka));
      },
      error => {
        console.log(error);
      }
    )
  }

  getPharmacies2() {
    this.clinicService.getPharmacies().subscribe(
      data => {
        this.clinics1 = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getDrugs() {
    this.drugService.getAllDrugs().subscribe(
      data => {
        this.drugs = data.filter(clinic => clinic.name.includes(this.lek));
      },
      error => {
        console.log(error);
      }
    )
  }

  getDrugs2() {
    this.drugService.getAllDrugs().subscribe(
      data => {
        this.drugs = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  sortData1(sort: Sort) {
    const data = this.clinics1.slice();
    if (!sort.active || sort.direction === '') {
      this.clinics1 = data;
      return;
    }

    this.clinics1 = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'address': return this.compare(a.address, b.address, isAsc);
        case 'description': return this.compare(a.description, b.description, isAsc);
        case 'pricelist': return this.compare(a.pricelist, b.pricelist, isAsc);
        case 'profit': return this.compare(a.profit, b.profit, isAsc);
        case 'id': return this.compare(a.id, b.id, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  handleLogin() {
    this.authenticationService.authenticationService(this.user.username, this.user.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.isVisible = false;
      this.successMessage = 'Uspešno ste se prijavili!';
    });

    this.login();
  }

  login() {
    this.authenticationService.loginDone(this.user).subscribe(

      (data: User) => {
        this.user = data;

        if(this.user.role === "NONE"){

          window.alert("Neuspesno logovanje");
          this.router.navigate(['/login']);
          return;
        }
        sessionStorage.setItem("authenticatedUser", this.user.username)
        sessionStorage.setItem("authenticatedUserRole", this.user.role)
        if (this.user.role === "SYSADMIN") {
          this.router.navigate(['/sysadmin-home-page']);
        } else if (this.user.role === 'PA') {
          this.router.navigate(['/patient-home-page']);
        } else if (this.user.role === 'PharmAdmin') {
          this.router.navigate(['/pharmacyadmin-home-page']);
        } else if (this.user.role === 'PHARMACIST') {
          this.router.navigate(['/pharmacistHomePage']);
        } else {
          this.invalidLogin = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  change(isVisible: boolean) {
    this.isVisible = isVisible;
  }
}
