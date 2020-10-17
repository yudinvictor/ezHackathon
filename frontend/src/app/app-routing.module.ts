import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {LandPageComponent} from "./land-page/land-page.component";
import {PlanPageComponent} from "./plan-page/plan-page.component";


const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/land', pathMatch: 'full'},
      {path: 'land', component: LandPageComponent},
      {path: 'plan', component: PlanPageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
