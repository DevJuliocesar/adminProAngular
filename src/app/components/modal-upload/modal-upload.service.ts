import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public tipo: string;
  public id: string;
  public notificacion = new EventEmitter<any>();
  constructor() {}

  cerrarModal(modalId) {
    // this.tipo = '';
    // this.id = '';
    // get modal
    const modal = document.getElementById(modalId);
    // change state like in hidden modal
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('tabindex', '-1');
    modal.removeAttribute('aria-modal');
    modal.removeAttribute('style');
    // get modal backdrop
    const modalBackdrops = document.getElementsByClassName('modal-backdrop');
    // remove opened modal backdrop
    document.body.removeChild(modalBackdrops[0]);
  }
}
