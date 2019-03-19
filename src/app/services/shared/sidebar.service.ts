import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Tablero', url: '/dashboard' },
        { titulo: 'Barra Progreso', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' },
      ]
    }
  ];

  constructor() { }
}
