import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NodesInputComponent } from './nodes-input/nodes-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {NodesListInputModule} from './nodes-input/nodes-list-input/nodes-list-input.module';
import {ChangesListModule} from './changes-list/changes-list.module';
import {ChangedNodesInputModule} from './changed-nodes-input/changed-nodes-input.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NodesInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    NodesListInputModule,
    ChangesListModule,
    ChangedNodesInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
