import { Component, OnInit } from '@angular/core';
import { HospitalRoom } from '../model/HospitalRoom';
import { hospitalRoomsService } from '../service/hospitalRooms.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { element } from 'protractor';

@Component({
  selector: 'app-hospital-room-search',
  templateUrl: './hospital-room-search.component.html',
  styleUrls: ['./hospital-room-search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HospitalRoomSearchComponent implements OnInit {
  searchText;
  rooms: HospitalRoom[] = [];
  newRoom: HospitalRoom = new HospitalRoom();
  isButtonVisible = false;
  constructor(private service: hospitalRoomsService) { }
  dataSource = new MatTableDataSource(this.rooms);
  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.service.getAllRooms2().subscribe(
      data => {
        this.rooms = data;
        this.dataSource = new MatTableDataSource(this.rooms);
      }, error => {
        console.log(error);
      }
    )
  }

  deleteRoom(room: HospitalRoom) {
    this.service.deleteRoom(room).subscribe(
      data => {
        location.reload();
      }, error => {
        console.log(error);
      }
    )
  }

  modifyRoom(room: HospitalRoom) {
    console.log(room.name);
    console.log(this.newRoom.name, this.newRoom.room_number)
    if (this.newRoom.name === "") {
      this.newRoom.name = room.name;
    }

    this.service.modifyRoom(this.newRoom, room.name).subscribe(
      data => {
        location.reload();
      }, error => {
        console.log(error);
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  columnsToDisplay = ['name', 'room_number'];
}


