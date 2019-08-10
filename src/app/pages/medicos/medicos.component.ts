import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

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

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Tu no podrás revertir esto!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Elimínalo!'
    }).then(result => {
      if (result.value) {
        this._medicoService
          .borrarMedico(medico._id)
          .subscribe(_ => this.cargarMedicos());
      }
    });
  }

  buscarMedico(termino: string) {
    if (termino.length > 4) {
      this._medicoService
        .buscarMedicos(termino)
        .subscribe(medicos => (this.medicos = medicos));
    } else {
      this.cargarMedicos();
    }
  }
}
