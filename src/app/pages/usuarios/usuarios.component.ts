import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(_ => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
      this.cargando = false;
      this.totalRegistros = res.total;
      this.usuarios = res.usuarios;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde <= this.totalRegistros && desde >= 0) {
      this.desde += valor;
      this.cargarUsuarios();
    }
  }

  buscarUsuario(termino: string) {
    if (termino.length > 4) {
      this._usuarioService
        .buscarUsuarios(termino)
        .subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;
        });
    } else {
      this.cargarUsuarios();
    }
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire(
        'No se puede borrar usuario',
        'No se puede borrar a sí mismo',
        'error'
      );
      return;
    }

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Tu no podrás revertir esto!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Elimínalo!'
    }).then(result => {
      if (result.value) {
        this._usuarioService
          .borrarUsuario(usuario._id)
          .subscribe(_ => this.cargarUsuarios());
      }
    });
  }

  editarFoto(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
}
