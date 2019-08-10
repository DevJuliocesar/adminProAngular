import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/models/hospital.model';
import { Medico } from 'src/models/medico.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('', '', '');
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activateRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe((res: Medico) => {
      this.medico._id = res._id;
      this.router.navigate(['/medico', res._id]);
    });
  }

  ngOnInit() {
    this._hospitalService
      .cargarHospitales()
      .subscribe((res: any) => (this.hospitales = res.hospitales));

    this._modalUploadService.notificacion.subscribe(
      res => (this.medico.img = res.newFileName)
    );
  }

  cambioHospital(id: string) {
    this._hospitalService
      .obtenerHospital(id)
      .subscribe((res: any) => (this.hospital = res.hospital));
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('medicos', id);
  }
}
