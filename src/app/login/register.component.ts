import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from './../services/usuario/usuario.service';
import { Usuario } from 'src/models/usuario.model';
import Swal from 'sweetalert2';

declare function init_plugins();
// const swal: SweetAlert;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  constructor(public _usuarioService: UsuarioService) {}

  validarPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.password_confirmacion.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {
    init_plugins();
    this.formRegister = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, Validators.required),
        password_confirmacion: new FormControl(null, Validators.required),
        condiciones: new FormControl(false, Validators.requiredTrue)
      },
      { validators: this.validarPasswords }
    );

    this.formRegister.setValue({
      nombre: 'Julio Cesar',
      correo: 'jcmaldonadom@ufpso.edu.co',
      password: '123',
      password_confirmacion: '1234',
      condiciones: true
    });
  }

  registrarUsuario() {
    if (this.formRegister.invalid) {
      Swal.fire({
        title: 'Advertencia!',
        text: 'Los campos deben ser correctos',
        type: 'warning',
        confirmButtonText: 'Ok'
      });
    }

    const usuario = new Usuario(
      this.formRegister.value.nombre,
      this.formRegister.value.correo,
      this.formRegister.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe(datos => {
      console.table(datos);
    });

    console.log(this.formRegister.valid);
    console.log(this.formRegister.value);
  }
}
