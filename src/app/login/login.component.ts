import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from '../services/service.index';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email: string;
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '672495984385-8drbunumr8rt9ed68sspsl4nt0piuc8e.apps.googleusercontent.com',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      googleUser => {
        const token = googleUser.getAuthResponse().id_token;
        this._usuarioService.loginGoogle(token).subscribe(_ =>
          this._ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          })
        );
      },
      error => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  ingresar(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }

    const usuario = new Usuario(null, form.value.email, form.value.password);
    this._usuarioService
      .login(usuario, this.recuerdame)
      .subscribe(_ => this.router.navigate(['/dashboard']));

    // this.router.navigate(["/dashboard"]);
  }
}
