import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from './../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(public http: HttpClient) {
    console.log('listo perro');
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICE + '/usuario';

    return this.http.post(url, usuario);
  }
}
