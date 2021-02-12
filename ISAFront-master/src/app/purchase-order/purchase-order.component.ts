import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PurchaseOrder } from '../model/PurchaseOrder';
import { MatTableDataSource } from '@angular/material';
import { PurchaseOrderService } from '../purchase-order.service';
import { AppTypeService } from '../service/appType.service';
import { AppointmentType } from '../model/AppointmentType';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PurchaseOrderComponent implements OnInit {

  searchText;
  types2: PurchaseOrder[] = [];
  types: AppointmentType[] = [];
  newType: PurchaseOrder = new PurchaseOrder();
  changeType: PurchaseOrder = new PurchaseOrder();
  isButtonVisible = false;
  dataSource = new MatTableDataSource(this.types);
  columnsToDisplay = ['name'];

  constructor(private service: PurchaseOrderService, private service2: AppTypeService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.service2.getAllTypes().subscribe(
      data => {
        this.types = data;
        this.dataSource = new MatTableDataSource(this.types);
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
