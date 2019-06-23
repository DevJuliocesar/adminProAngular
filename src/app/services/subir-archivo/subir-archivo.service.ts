import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  constructor(public http: HttpClient) {}

  subirArchivo(archivo: File, tipo: string, id: string, token?: string) {
    const url = `${URL_SERVICE}/upload/${tipo}/${id}`;
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      reportProgress: true
    };
    const formData = new FormData();
    formData.append('imagen', archivo, archivo.name);
    return this.http.put(url, formData, options);
  }
}
