import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { 
   MatInputModule, MatDialogModule, MatButtonModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
    imports: [
       MatTableModule,
       MatPaginatorModule,
       MatSortModule,
       MatDatepickerModule, 
       MatNativeDateModule,
       MatFormFieldModule,
       MatInputModule,
       MatDialogModule, 
       MatFormFieldModule,
       MatButtonModule,
       MatDialogModule,
       MatTabsModule
    ],
    exports: [
       MatTableModule,
       MatPaginatorModule,
       MatSortModule,
       MatDatepickerModule, 
       MatNativeDateModule,
       MatFormFieldModule,
       MatInputModule,
       MatDialogModule, 
       MatFormFieldModule,
       MatButtonModule,
       MatDialogModule,
       MatTabsModule
    ]
 })

export class AngularMaterialModule {}