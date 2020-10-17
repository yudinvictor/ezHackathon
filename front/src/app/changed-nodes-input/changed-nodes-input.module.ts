import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangedNodesInputComponent } from './changed-nodes-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [ChangedNodesInputComponent],
  exports: [
    ChangedNodesInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ]
})
export class ChangedNodesInputModule { }
