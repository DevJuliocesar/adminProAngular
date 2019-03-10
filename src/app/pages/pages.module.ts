import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Survey1Component } from "./survey1/survey1.component";

import { SharedModule } from "../shared/shared.module";
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Survey1Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
