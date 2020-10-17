import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesListInputComponent } from './nodes-list-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [NodesListInputComponent],
  exports: [
    NodesListInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class NodesListInputModule { }
