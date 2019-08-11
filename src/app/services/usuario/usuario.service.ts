import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { URL_SERVICE } from './../../config/config';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];
  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  isLogged() {
    return this.token.length > 5 ? true : false;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigateByUrl('/login');
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  login(usuario: Usuario, recuerdame: boolean) {
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICE + '/login';
    return this.http.post(url, usuario).pipe(
      map((res: any) =>
        this.guardarStorage(res.id, res.token, res.usuario, res.menu)
      ),
      catchError(this.handleError)
    );
  }

  loginGoogle(token: string) {
    const url = URL_SERVICE + '/login/google';
    return this.http
      .post(url, { token })
      .pipe(
        map((res: any) =>
          this.guardarStorage(res.id, res.token, res.usuario, res.menu)
        )
      );
  }

  cargarUsuarios(desde: number) {
    const url = `${URL_SERVICE}/usuario?skip=${desde}`;
    return this.http.get(url);
  }

  buscarUsuarios(termino: String) {
    const url = `${URL_SERVICE}/busqueda/coleccion/usuarios/${termino}`;
    return this.http.get(url).pipe(map((res: any) => res.usuarios));
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

  actualizarUsuario(usuario: Usuario) {
    const url = `${URL_SERVICE}/usuario/${usuario._id}`;
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };

    return this.http.put(url, usuario, header).pipe(
      map((resp: any) => {
        Swal.fire('Usuario Actualizado', usuario.nombre, 'success');

        if (usuario._id === this.usuario._id) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }

        return true;
      })
    );
  }

  borrarUsuario(id: string) {
    const url = `${URL_SERVICE}/usuario/${id}`;
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };
    return this.http.delete(url, header).pipe(
      map((res: any) => {
        Swal.fire(
          'Eliminado!',
          `El usuario ${res.usuario.nombre} ha sido eliminado`,
          'success'
        );
        return true;
      })
    );
  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivoService
      .subirArchivo(file, 'usuarios', id, this.token)
      .subscribe((res: any) => {
        const user: Usuario = res.usuario;
        this.usuario.img = user.img;
        Swal.fire('Imagen Actualizada', user.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      });
  }

  private handleError(error: HttpErrorResponse) {
    Swal.fire('Error en el login', error.error.mensaje, 'error');
    return throwError('Something bad happened; please try again later.');
  }
}
