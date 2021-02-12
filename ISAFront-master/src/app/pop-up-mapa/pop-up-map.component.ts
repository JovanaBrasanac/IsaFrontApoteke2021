import { Component, OnInit, Inject } from '@angular/core';
import { Doctor } from '../model/Doctor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReservationAppointmentRoom } from '../model/ReservationAppointmentRoom';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopUpDoctorsComponent } from '../pop-up-doktori/pop-up-doctors.component';
import { SurgeryRoomService } from '../service/surgery-room.service';
import { RequestAppointmentService } from '../service/requestAppointment.service';
import { Pharmacy } from '../model/Pharmacy';
import { MapData } from '../model/MapData';
import { User } from '../model/User';
import { PhamacyService } from '../service/pharmacy.service';
import { ClinicAdministratorService } from '../service/clinicAdministrator.service';

@Component({
  selector: 'app-pop-up-map',
  templateUrl: './pop-up-map.component.html',
  styleUrls: ['./pop-up-map.component.css']
})
export class PopUpMapComponent implements OnInit {
  user: User = new User();
  clinic: Pharmacy = new Pharmacy();
  form: FormGroup;
  mapData: MapData = new MapData();
  isSubmitted: boolean;
  constructor(public dialogRef: MatDialogRef<PopUpDoctorsComponent>,
    private adminService: ClinicAdministratorService,
    private clinicService: PhamacyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: SurgeryRoomService,
    private appService: RequestAppointmentService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
      doctorRadio: new FormControl()
    })
  }

  ngOnInit() {
    this.getMyClinic();
    console.log(this.data);
    this.mapData = this.data;
    ;
  }
  onClose() {
    this.dialogRef.close();
  }

  change() {
    this.clinic.lat = this.mapData.latitude;
    this.clinic.longitude = this.mapData.longitude;
    this.clinic.address = this.mapData.address;
    this.clinicService.changePharmacyData(this.clinic, this.clinic.name).subscribe(
      data => {
        location.reload();
      },
      error => {
        console.log(error);
      }
    )
  }

  getMyClinic() {
    this.user.username = sessionStorage.getItem("authenticatedUser");
    this.adminService.getMyClinic(this.user.username).subscribe(
      data => {
        this.clinic = data;
      },
      error => {
        console.log(error);
      }
    )
  }
}