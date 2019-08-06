import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos = 0;

  constructor(public http: HttpClient) {}

  cargarMedicos() {
    const url = URL_SERVICE + '/medico';
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        console.log(resp);
        return resp.medicos;
      })
    );
  }
}
