import { Component, OnInit } from '@angular/core';
import { HospitalRoom } from '../model/HospitalRoom';
import { hospitalRoomsService } from '../service/hospitalRooms.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {
  user: User = new User();
  room: HospitalRoom = new HospitalRoom();
  constructor(private service: hospitalRoomsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.user.username = sessionStorage.getItem("authenticatedUser");
    this.service.addRoom(this.room, this.user.username).subscribe(
      data => {
        alert("Soba je dodata");
        this.router.navigateByUrl("/find-room");
      }, error => {
        console.log(error);
      }
    );
  }

}
