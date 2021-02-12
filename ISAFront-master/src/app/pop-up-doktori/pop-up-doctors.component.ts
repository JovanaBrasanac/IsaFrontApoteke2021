import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material'
import { Inject } from '@angular/core';
import { SurgeryRoomService } from '../service/surgery-room.service';
import { Doctor } from '../model/Doctor';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ReservationSurgeryRoom } from '../model/ReservationSurgeryRoom';

@Component({
  selector: 'app-pop-up-doctors',
  templateUrl: './pop-up-doctors.component.html',
  styleUrls: ['./pop-up-doctors.component.css']
})
export class PopUpDoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  noDoctors: boolean = false;
  form: FormGroup;
  resRoom: ReservationSurgeryRoom = new ReservationSurgeryRoom();
  constructor(public dialogRef: MatDialogRef<PopUpDoctorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: SurgeryRoomService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
  }

  ngOnInit() {
    console.log(this.data);
    this.findAvailableDoctors();
  }

  onClose() {
    this.dialogRef.close();
  }

  findAvailableDoctors() {
    this.service.getAvailableDoctors(this.data).subscribe(
      data => {
        this.doctors = data;
        if (this.doctors.length == 0)
          this.noDoctors = true;
        else
          this.noDoctors = false;
      });
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    this.resRoom.doctors = this.form.get('checkArray').value;
    this.resRoom.surgery = this.data;
    this.service.setRoomOfSurgery(this.resRoom).subscribe(
      (result) => {
        alert("Uspešno!");
        window.location.href = 'http://localhost:4200/surgery-hospital-room';
      },
      error => {
        console.log(error);
        alert("Soba je već rezervisana!");
        window.location.href = 'http://localhost:4200/surgery-hospital-room';
      });
    this.onClose();
  }
}
