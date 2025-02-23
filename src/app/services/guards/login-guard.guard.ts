import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}
  canActivate() {
    if (this._usuarioService.isLogged()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
