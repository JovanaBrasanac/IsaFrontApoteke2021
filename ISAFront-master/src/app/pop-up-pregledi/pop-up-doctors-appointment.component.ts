import { Component, OnInit, Inject } from '@angular/core';
import { Doctor } from '../model/Doctor';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ReservationSurgeryRoom } from '../model/ReservationSurgeryRoom';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopUpDoctorsComponent } from '../pop-up-doktori/pop-up-doctors.component';
import { SurgeryRoomService } from '../service/surgery-room.service';
import { ReservationAppointmentRoom } from '../model/ReservationAppointmentRoom';
import { RequestAppointmentService } from '../service/requestAppointment.service';

@Component({
  selector: 'app-pop-up-doctors-appointment',
  templateUrl: './pop-up-doctors-appointment.component.html',
  styleUrls: ['./pop-up-doctors-appointment.component.css']
})
export class PopUpDoctorsAppointmentComponent implements OnInit {

  doctors: Doctor[] = [];
  noDoctors: boolean = false;
  form: FormGroup;
  resRoom: ReservationAppointmentRoom = new ReservationAppointmentRoom();
  isSubmitted: boolean;
  constructor(public dialogRef: MatDialogRef<PopUpDoctorsComponent>,
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

  registrationForm = this.fb.group({
    doctorRadio: ['']
  })

  get myForm() {
    return this.registrationForm.get('doctorRadio');
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

  onSubmit() {
    this.isSubmitted = true;
    if (!this.form.valid) {
      return false;
    } else {

      const doc = JSON.stringify(this.form.value).split(':');
      const d = doc[2];
      this.resRoom.doctor = d[0];
      this.resRoom.appointment = this.data;
      console.log(this.resRoom.doctor)
      this.appService.setRoomOfFastAppointment(this.resRoom).subscribe(
        (result) => {
          alert("Uspešno!");
          location.reload();
        });
      this.onClose();
    }
  }

  submitForm() {
    this.resRoom.doctor = this.form.get('checkArray').value;
    this.resRoom.appointment = this.data;
    console.log(this.resRoom.doctor)
    this.appService.setRoomOfFastAppointment(this.resRoom).subscribe(
      (result) => {
        alert("Uspešno!");
      });
    this.onClose();
  }
}
