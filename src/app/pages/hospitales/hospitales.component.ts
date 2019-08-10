import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { loadLContextFromNode } from '@angular/core/src/render3/discovery_utils';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent implements OnInit {
  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}
  hospitales: Hospital[] = [];
  totalRegistros = 0;
  cargando = true;
  hospital: Hospital;
  newHospital: any;

  crearHospital() {
    Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        this._hospitalService
          .crearHospital({
            nombre: res.value
          })
          .subscribe(() => this.cargarHospitales());
      }
    });
  }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(_ =>
      this.cargarHospitales()
    );
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales().subscribe((res: any) => {
      this.cargando = false;
      this.totalRegistros = res.total;
      this.hospitales = res.hospitales;
    });
  }

  buscarHospital(termino: string) {
    if (termino.length > 4) {
      this._hospitalService
        .buscarHospital(termino)
        .subscribe((hospitales: Hospital[]) => {
          this.hospitales = hospitales;
        });
    } else {
      this.cargarHospitales();
    }
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
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
        this._hospitalService
          .borrarHospital(hospital._id)
          .subscribe(_ => this.cargarHospitales());
      }
    });
  }

  editarFoto(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }
}
