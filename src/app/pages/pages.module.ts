import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Survey1Component } from './survey1/survey1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';

import { IncrementComponent } from '../components/increment/increment.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Survey1Component,
    IncrementComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    ModalUploadComponent,
    UsuariosComponent,
    HospitalesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ]
})
export class PagesModule {}
