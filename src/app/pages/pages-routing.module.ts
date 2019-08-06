import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Survey1Component } from './survey1/survey1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginGuardGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Tablero', description: 'Tablero de pagina' }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress', description: 'Progress de pagina' }
      },
      {
        path: 'graficas',
        component: Survey1Component,
        data: { titulo: 'Graficas', description: 'Graficas de pagina' }
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas', description: 'Promesas de pagina' }
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { titulo: 'Rxjs', description: 'Rxjs de pagina' }
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajustes del tema', description: 'Tablero de pagina' }
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        data: { titulo: 'Perfil de Usuario' }
      },
      // Gestión
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Gestión de Usuarios' }
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Gestión de hospitales' }
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Gestión de Médicos' }
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { titulo: 'Actualizar Médico' }
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
