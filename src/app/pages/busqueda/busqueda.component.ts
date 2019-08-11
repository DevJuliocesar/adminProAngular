import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { Hospital } from 'src/models/hospital.model';
import { Medico } from 'src/models/medico.model';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];
  usuarios: Usuario[] = [];
  constructor(public activateRoute: ActivatedRoute, public http: HttpClient) {
    activateRoute.params.subscribe(params => {
      const termino = params['termino'];
      this.buscar(termino);
    });
  }

  ngOnInit() {}

  buscar(termino: string) {
    const url = `${URL_SERVICE}/busqueda/todo/${termino}`;
    this.http.get(url).subscribe((res: any) => {
      if (res.ok === true) {
        this.medicos = res.medicos.length ? res.medicos : null;
        this.hospitales = res.hospitales.length ? res.hospitales : null;
        this.usuarios = res.usuarios.length ? res.usuarios : null;
      }
    });
  }
}
