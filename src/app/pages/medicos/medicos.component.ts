import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];

  constructor(public _medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService
      .cargarMedicos()
      .subscribe(medicos => (this.medicos = medicos));
  }

  crearMedico() {}

  guardarMedico() {}

  borrarMedico() {}

  buscarMedico() {}
}
