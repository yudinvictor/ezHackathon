import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangesListComponent } from './changes-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [ChangesListComponent],
  exports: [
    ChangesListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ChangesListModule { }
