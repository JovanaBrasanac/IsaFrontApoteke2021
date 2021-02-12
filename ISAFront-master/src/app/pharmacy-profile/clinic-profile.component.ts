import { Component, OnInit, Inject } from '@angular/core';
import { ClinicCenterAdministratorService } from '../service/clinicalCenterAdmin.service';
import { User } from '../model/User';
import { Pharmacy } from '../model/Pharmacy';
import { ClinicAdministratorService } from '../service/clinicAdministrator.service';
import { PhamacyService } from '../service/pharmacy.service';
import { PriceList } from '../model/PriceList';
import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { DialogPriceComponent } from '../cena/dialog-price.component';
import { AppointmentType } from '../model/AppointmentType';
import { PopUpDoctorsAppointmentComponent } from '../pop-up-pregledi/pop-up-doctors-appointment.component';
import { PopUpMapComponent } from '../pop-up-mapa/pop-up-map.component';
import { MapData } from '../model/MapData';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';

declare var ol: any;

export interface DialogData {
  price: number;
  appointmentType: AppointmentType;
  id: number;
  newPrice: number;
}

@Component({
  selector: 'app-clinic-profile',
  templateUrl: './clinic-profile.component.html',
  styleUrls: ['./clinic-profile.component.css']
})
export class ClinicProfileComponent implements OnInit {

  animal: string;
  user: User = new User();
  clinic: Pharmacy = new Pharmacy();
  priceList: PriceList[] = [];
  name: String = "";
  longitude: number = 18.11041262280196;
  latitude: number = 43.259405942773384;
  map: any;
  show: number = 0;
  priceUpdate: PriceList;
  newPrice: number;
  role: string;
  static clinicService: any;
  constructor(private service: ClinicAdministratorService,private router: Router, private clinicService: PhamacyService, public dialog: MatDialog) { }
  dataSource = new MatTableDataSource(this.priceList);

  ngOnInit() {

    this.checkRole();
    this.getMyClinic();
//    this.getPrices();
    console.log(this.longitude);
    console.log(this.latitude);

  }

  checkRole(){

    this.role = sessionStorage.getItem("authenticatedUserRole");

    console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));

    if(this.role !== "PharmAdmin"){

      window.alert("Niste ulogovani kao admin apoteke i nemate pristup ovoj stranici!");
      this.router.navigate(['/login']);
    }

  }

  change(price){

    this.priceUpdate = price;
    this.show = 1;
    this.newPrice = this.priceUpdate.price;
    
  }

  onClick(){
    console.log("Usao u izmenu");
    this.priceUpdate.price = this.newPrice;
    console.log("Nova cena: " + this.priceUpdate.price);
    this.clinicService.priceUpdate(this.priceUpdate).subscribe(

      data=>{

        this.getPrices();

      }

    );
   
  }

  getMyClinic() {
    this.user.username = sessionStorage.getItem("authenticatedUser");
    this.service.getMyClinic(this.user.username).subscribe(
      data => {
        var clinic2 = new Pharmacy();
        var adminService: ClinicAdministratorService;
        this.clinic = data;
        this.getPrices();
        var clinic2 = data;
        this.name = this.clinic.name;
        this.longitude = this.clinic.longitude;
        this.latitude = this.clinic.lat;
        this.map = new ol.Map({
          target: 'map',
          controls: ol.control.defaults({
            attributionOptions: {
              collapsible: false
            }
          }),
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({

            center: ol.proj.fromLonLat([this.latitude, this.longitude]),
            zoom: 17
          })
        });
        var self = this;
        this.map.on('click', function (evt) {

          console.log(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
          var lat1 = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')[0];
          var long1 = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')[1];
          this.longii = long1;
          console.log(self.longitude);

          fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lat1 + '&lat=' + long1)
            .then(function (response) {
              return response.json();
            }).then(function (json) {
              console.log(json);
              const myObjStr = JSON.stringify(json);
              var str = myObjStr.split(":")
              console.log(str[8]);
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.width = "60%";
              var mapData = new MapData();
              mapData.longitude = long1;
              mapData.latitude = lat1;
              mapData.address = str[8];
              dialogConfig.data = mapData;
    //          self.dialog.open(PopUpMapComponent, dialogConfig);
            });

        });
        const marker = new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat([this.latitude, this.longitude])
          ), name: 'Moja klinika'
        });
        const style = new ol.style.Style({
          stroke: new ol.style.Stroke({ color: '#F5F113' }),
          text: new ol.style.Text({
            text: marker.get('name'),
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({ color: '#F5F113' }),
            stroke: new ol.style.Stroke({
              color: '#F5F113', width: 2
            })
          })
        });

        marker.setStyle(style);
        var layer = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [
              marker

            ]
          })
        });
        this.map.addLayer(layer);
     //   this.reverseGeocode([this.latitude, this.longitude]);
      },
      error => {
        console.log(error);
      }
    )
  }

  modifyClinic() {
    if (this.clinic.name != "" && this.clinic.description != "") {
      this.clinicService.changePharmacyData(this.clinic, this.name).subscribe(
        data => {
          location.reload();
        },
        error => {
          console.log(error);
          alert("Klinika je promenjena od strane drugog administratora");
          location.reload();
        });

    } else {
      alert("Polja ne smeju biti prazna");
    }
  }

  getPrices() {
    this.service.getPrices(this.clinic).subscribe(
      data => {
        this.priceList = data;
        console.log(this.priceList[0].id)
        this.dataSource = new MatTableDataSource(this.priceList);
      },
      error => {
        console.log(error);
      }
    )
  }

  openDialog(price): void {
    const dialogRef = this.dialog.open(DialogPriceComponent, {
      width: '250px',
      data: { price: price.price, appointmentType: price.appointmentType, id: price.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  reverseGeocode(coords) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
      });
  }
}

