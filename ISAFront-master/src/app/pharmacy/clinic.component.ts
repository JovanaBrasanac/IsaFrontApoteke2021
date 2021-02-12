import { Component, OnInit } from "@angular/core";

import { Router } from '@angular/router';
import { PhamacyService } from '../service/pharmacy.service';
import { ClinicAdministrator } from '../model/ClinicAdministrator';
import { Pharmacy } from '../model/Pharmacy';
import { ClinicAdministratorService } from '../service/clinicAdministrator.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../model/User';
import { PriceList } from '../model/PriceList';
import { MatDialogConfig } from '@angular/material';
import { MapData } from '../model/MapData';
import { PopUpMapComponent } from '../pop-up-mapa/pop-up-map.component';
import { error } from 'util';

declare var ol: any;

@Component({
    templateUrl: './clinic.component.html',
    styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

    role: string;
    address: String = "";
    clinic: Pharmacy = new Pharmacy();
    submitted = false;
    clinics: Pharmacy[] = [];
    isButtonVisible = false;
    clinicAdministrator: ClinicAdministrator = new ClinicAdministrator();
    clickedClinic = "";
    clinicToAddNewAdmin: Pharmacy = new Pharmacy();
    addAdminClicked = false;
    user: User = new User();
    priceList: PriceList[] = [];
    name: String = "";
    latitude: number = 44.8021193;
    longitude: number = 20.458154295098467;
    map: any;
    form = new FormGroup({
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
    form2 = new FormGroup({
        name: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
    })
    constructor(private clinicService: PhamacyService,
        private adminService: ClinicAdministratorService,
        private router: Router) { }

    ngOnInit() {

        this.checkRole();
        this.getPharmacies();
        
    }

    checkRole(){

        this.role = sessionStorage.getItem("authenticatedUserRole");
    
        console.log("Uloga: " + sessionStorage.getItem("authenticatedUserRole"));
    
        if(this.role !== "SYSADMIN"){
    
          window.alert("Niste ulogovani kao administrator sistema i nemate pristup ovoj stranici!");
          this.router.navigate(['/login']);
        }
    
      }

    getPharmacies() {
        this.clinicService.getPharmacies().subscribe(
            data => {
                this.clinics = data;
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

                        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
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
                            self.clinic.longitude = long1;
                            self.clinic.lat = lat1;
                            self.clinic.address = str[8];
                            self.address = str[8];
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
                this.reverseGeocode([this.latitude, this.longitude]);
            },
            error => {
                console.log(error);
            }
        )
    }


    save() {
        console.log(this.clinic)
        this.clinicService.createPharmacy(this.clinic)

            .subscribe((result) => {
                this.getPharmacies();
            })
        this.clinic = new Pharmacy();
    }

    onSubmit() {
        this.submitted = true;
        this.save();
    }
    change() {
        !this.isButtonVisible
    }

    addAdminForm(clinic: Pharmacy) {
        this.clinicToAddNewAdmin = clinic;
        this.addAdminClicked = true;
    }
    onSubmitAdmin() {
        console.log(this.clinicAdministrator);
        this.addAdminClicked = false;
        this.adminService.newAdmin(this.clinicAdministrator, this.clinicToAddNewAdmin.id)
            .subscribe((result) => {
                alert("Uspešno dodato!");
            })
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