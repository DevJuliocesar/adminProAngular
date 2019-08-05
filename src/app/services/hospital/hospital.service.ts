import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';
import { Hospital } from 'src/models/hospital.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(public http: HttpClient, public _usuarioService: UsuarioService) {
    this.cargarHospitales();
  }

  cargarHospitales() {
    const url = `${URL_SERVICE}/hospital`;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    const url = `${URL_SERVICE}/hospital/${id}`;
    return this.http.get(url);
  }

  borrarHospital(id: string) {
    const url = `${URL_SERVICE}/hospital/${id}`;
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._usuarioService.token}`
      )
    };
    return this.http.delete(url, header).pipe(
      map((res: any) => {
        Swal.fire(
          'Eliminado!',
          `El hospital ${res.hospital.nombre} ha sido eliminado`,
          'success'
        );
        return true;
      })
    );
  }

  crearHospital(hospital: Hospital) {
    const url = URL_SERVICE + '/hospital';
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._usuarioService.token}`
      )
    };
    return this.http.post(url, hospital, header).pipe(
      map((resp: any) => {
        Swal.fire('Hospital Creado', hospital.nombre, 'success');
        return resp;
      })
    );
  }

  buscarHospital(termino: string) {
    const url = `${URL_SERVICE}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url).pipe(map((res: any) => res.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    const url = `${URL_SERVICE}/hospital/${hospital._id}`;
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._usuarioService.token}`
      )
    };
    return this.http.put(url, hospital, header).pipe(
      map((resp: any) => {
        Swal.fire('Hospital Actualizado', hospital.nombre, 'success');
        return true;
      })
    );
  }
}
