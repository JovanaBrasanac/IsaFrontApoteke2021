import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppointmentType } from '../model/AppointmentType';
import { AppTypeService } from '../service/appType.service';
import { MatTableDataSource } from '@angular/material';
import { PurchaseOrderService } from '../purchase-order.service';
import { PurchaseOrder } from '../model/PurchaseOrder';
import { Pharmacy } from '../model/Pharmacy';
import { ClinicAdministratorService } from '../service/clinicAdministrator.service';
import { User } from '../model/User';
import { Drug } from '../model/Drug';
import { PhamacyService } from '../service/pharmacy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-types',
  templateUrl: './appointment-types.component.html',
  styleUrls: ['./appointment-types.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppointmentTypesComponent implements OnInit {
  searchText;
  types2: AppointmentType[] = [];
  types: PurchaseOrder[] = [];
  drugs: Drug[] = [];
  newType: AppointmentType = new AppointmentType();
  changeType: AppointmentType = new AppointmentType();
  isButtonVisible = false;
  dataSource = new MatTableDataSource(this.types);
  dataSource2 = new MatTableDataSource(this.drugs);
  columnsToDisplay = ['name', 'date'];
  pharmacy: Pharmacy = new Pharmacy();
  user: User = new User();
  role: string;
  

  constructor(private service: AppTypeService,private router: Router , private service2: PurchaseOrderService, private adminService: ClinicAdministratorService, private pharmacyService: PhamacyService) { }

  ngOnInit(): void {
    
    this.checkRole();
    this.getPharmacy();
  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PharmAdmin"){

      window.alert("Niste ulogovani kao admin apoteke i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  getTypes() {
    this.service2.getAllOrders(this.pharmacy).subscribe(
      data => {
        this.types = data;
        this.dataSource = new MatTableDataSource(this.types);
      }, error => {
        console.log(error);
      }
    )
  }

  getDrugs() {
    this.pharmacyService.getDrugsPharmacy2(this.pharmacy).subscribe(
      data => {
        this.drugs = data;
        this.dataSource2 = new MatTableDataSource(this.drugs);
      }, error => {
        console.log(error);
      }
    )
  }

  getPharmacy(){
    this.user.username = sessionStorage.getItem("authenticatedUser");
    this.adminService.getMyClinic(this.user.username).subscribe(
      data => {
        this.pharmacy = data;
        this.getTypes();
      },
      error => {
        console.log(error);
      }
    )
  }

  addType() {

    this.service.addType(this.newType).subscribe(
      data => {
        alert("Dodat tip!");
        location.reload();
      }, error => {
        console.log(error);
      }
    );
  }

  modifyType(type: AppointmentType) {
    console.log(type.name);
    console.log(this.changeType.name)
    this.service.modifyType(this.changeType, type.name).subscribe(
      data => {
        location.reload();
      }, error => {
        console.log(error);
      }
    )
  }

  offers(type: PurchaseOrder) {
    this.service2.getOffers(type).subscribe(
      data => {
      //  location.reload();
      }, error => {
        console.log(error);
      }
    )
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  change() {
    if (this.isButtonVisible == false)
      this.isButtonVisible = true;
    else this.isButtonVisible = false;
  }
}
