import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangesListComponent } from './changes-list.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [ChangesListComponent],
  exports: [
    ChangesListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class ChangesListModule { }
