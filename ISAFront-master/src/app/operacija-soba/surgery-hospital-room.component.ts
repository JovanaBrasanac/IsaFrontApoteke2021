import { Component, OnInit } from '@angular/core';
import { HospitalRoom } from '../model/HospitalRoom';
import { SurgeryRoomService } from '../service/surgery-room.service';
import { Surgery } from '../model/Surgery';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopUpDoctorsComponent } from '../pop-up-doktori/pop-up-doctors.component';
import { AvailableRoom } from '../model/AvailableRoom';

@Component({
  selector: 'app-surgery-hospital-room',
  templateUrl: './surgery-hospital-room.component.html',
  styleUrls: ['./surgery-hospital-room.component.css']
})
export class SurgeryHospitalRoomComponent implements OnInit {

  addRoomClicked = false;
  searchText;
  rooms: HospitalRoom[] = [];
  isButtonVisible = false;
  surgeries: Surgery[] = [];
  clickedSurgery: Surgery;
  showMessage: boolean = false;
  availableRoom: AvailableRoom = new AvailableRoom();
  constructor(private service: SurgeryRoomService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSurgeries();
  }

  getRooms() {
    this.service.getAllRooms().subscribe(
      data => {
        this.rooms = data;
      }, error => {
        console.log(error);
      }
    )
  }

  getSurgeries() {
    this.service.getSurgeriesService().subscribe(
      data => {
        this.surgeries = data;
      }, error => {
        console.log(error);
      }
    );
  }

  addRoom(surgery) {
    this.showMessage = false;
    this.addRoomClicked = true;
    this.clickedSurgery = surgery;
    surgery.doctorSurgery = "";
    console.log(surgery);
    this.service.getAvailableRooms(surgery).subscribe(
      data => {
        this.rooms = data;
        console.log(data);
        if (this.rooms.length == 0) {
          this.showMessage = true;
          this.service.getAvailableRoomForOtherDate(surgery).subscribe(
            data => {
              console.log(data);
              this.availableRoom = data;
            });
        }
      }, error => {
        console.log(error);
      }
    )
  }

  chooseDoctor(room) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.clickedSurgery.roomID = room;
    dialogConfig.data = this.clickedSurgery;
    this.dialog.open(PopUpDoctorsComponent, dialogConfig);

  }
  chooseDoctor2(room) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.clickedSurgery.roomID = room;
    this.clickedSurgery.date = this.availableRoom.date;
    dialogConfig.data = this.clickedSurgery;
    this.dialog.open(PopUpDoctorsComponent, dialogConfig);

  }
}
