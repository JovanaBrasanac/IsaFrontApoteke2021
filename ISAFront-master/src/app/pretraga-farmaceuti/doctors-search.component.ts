import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Doctor } from '../model/Doctor';
import { DoctorService } from '../service/doctor.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors-search',
  templateUrl: './doctors-search.component.html',
  styleUrls: ['./doctors-search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DoctorsSearchComponent implements OnInit {

  role:string;
  searchText;
  doctors: Doctor[] = [];
  isButtonVisible = false;
  constructor(private service: DoctorService, private router: Router) { }
  dataSource = new MatTableDataSource(this.doctors);


  ngOnInit(): void {

    this.checkRole();
    this.getDoctors();
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PharmAdmin"){

      window.alert("Niste ulogovani kao admin apoteke i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  deleteDoc(doc: Doctor) {
    this.service.deleteDoctor(doc).subscribe(
      data => {
        location.reload();
      }, error => {
        console.log(error);
      }
    )
  }

  getDoctors() {
    this.service.getAllDoctors2().subscribe(
      data => {
        this.doctors = data;
        console.log(data[0])
        this.dataSource = new MatTableDataSource(this.doctors);
      }, error => {
        console.log(error);
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  columnsToDisplay = ['username', 'firstName','lastName','city','country','email','mobileNumber','jmbg'];
}
