import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LandPageComponent } from './land-page/land-page.component';
import { PlanPageComponent } from './plan-page/plan-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LandPageComponent,
    PlanPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
