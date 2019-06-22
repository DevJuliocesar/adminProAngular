import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from './../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  isLogged() {
    return this.token.length > 5 ? true : false;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigateByUrl('/login');
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

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
