import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  SubirArchivoService,
  UsuarioService
} from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;
  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {}

  seleccionImagen(archivo) {
    this.imagenSubir = archivo ? archivo : null;

    if (!archivo.type.includes('image')) {
      Swal.fire('Sólo Imágenes', 'El archivo no es una imágen', 'error');
      return (this.imagenSubir = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    this.imagenTemp = reader.result.toString();
    reader.onloadend = () => (this.imagenTemp = reader.result.toString());
  }

  subirImagen() {
    this._subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this._modalUploadService.tipo,
        this._modalUploadService.id,
        this._usuarioService.token
      )
      .subscribe(res => {
        this.imagenSubir = null;
        this.imagenTemp = null;
        this._modalUploadService.cerrarModal('upload-image');
        this._modalUploadService.notificacion.emit(res);
      });
  }
}
