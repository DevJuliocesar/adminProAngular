import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from './../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient) {}

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login(usuario: Usuario, recuerdame: boolean) {
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICE + '/login';
    return this.http
      .post(url, usuario)
      .pipe(
        map((res: any) => this.guardarStorage(res.id, res.token, res.usuario))
      );
  }

  loginGoogle(token: string) {
    const url = URL_SERVICE + '/login/google';
    return this.http
      .post(url, { token })
      .pipe(
        map((res: any) => this.guardarStorage(res.id, res.token, res.usuario))
      );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICE + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire('Usuario Creado', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }
}
