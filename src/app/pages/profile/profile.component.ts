import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo) {
    this.imagenSubir = archivo ? archivo : null;

    if (!archivo.type.includes('image')) {
      Swal.fire('Sólo Imágenes', 'El archivo no es una imágen', 'error');
      return (this.imagenSubir = null);
    }

    const reader = new FileReader();
    reader.onloadend = () => (this.imagenTemp = reader.result.toString());
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
