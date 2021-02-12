import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../pharmacy-profile/clinic-profile.component';
import { ClinicAdministratorService } from '../service/clinicAdministrator.service';
import { PriceList } from '../model/PriceList';
import { PriceList2 } from '../model/PriceList2';

@Component({
  selector: 'app-dialog-price',
  templateUrl: './dialog-price.component.html',
  styleUrls: ['./dialog-price.component.css']
})
export class DialogPriceComponent implements OnInit {

  constructor(
    private service : ClinicAdministratorService,
    public dialogRef: MatDialogRef<DialogPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() : void{
    console.log(this.data.price);
    const pr=new PriceList2();
    pr.id=this.data.id;
    pr.price=this.data.price;
  
    this.service.changePrice(this.data).subscribe(
      data => {
       location.reload();
      }, error => {
        console.log(error);
      }
      
    );
  }
  ngOnInit() {
  }

}
