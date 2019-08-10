import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {}

  cargarMedicos() {
    const url = URL_SERVICE + '/medico';
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  cargarMedico(id: string) {
    const url = `${URL_SERVICE}/medico/${id}`;
    return this.http.get(url).pipe(map((resp: any) => resp.medico));
  }

  borrarMedico(id: string) {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._usuarioService.token}`
      )
    };
    const url = `${URL_SERVICE}/medico/${id}`;
    return this.http.delete(url, header).pipe(
      map((res: any) => {
        Swal.fire(
          'Eliminado!',
          `El mèdico ${res.medico.nombre} ha sido eliminado`,
          'success'
        );
        return true;
      })
    );
  }

  guardarMedico(medico: Medico) {
    console.log(medico);
    let url = URL_SERVICE + '/medico';
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this._usuarioService.token}`
      )
    };

    if (medico._id) {
      url += '/' + medico._id;
      return this.http.put(url, medico, header).pipe(
        map((res: any) => {
          Swal.fire('Médico Actualizado', medico.nombre, 'success');
          return res.medico;
        })
      );
    } else {
      return this.http.post(url, medico, header).pipe(
        map((res: any) => {
          Swal.fire('Médico Creado', medico.nombre, 'success');
          return res.medico;
        })
      );
    }
  }

  buscarMedicos(termino: String) {
    const url = `${URL_SERVICE}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        console.log(res);
        return res.medicos;
      })
    );
  }
}
