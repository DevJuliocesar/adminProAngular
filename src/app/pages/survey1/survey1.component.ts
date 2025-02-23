import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey1',
  templateUrl: './survey1.component.html',
  styles: []
})
export class Survey1Component implements OnInit {
  graficos: any = {
    grafico1: {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data: [24, 30, 46],
      leyenda: 'El pan se come con'
    },
    grafico2: {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      leyenda: 'Entrevistados'
    },
    grafico3: {
      labels: ['Si', 'No'],
      data: [95, 5],
      leyenda: '¿Le dan gases los frijoles?'
    },
    grafico4: {
      labels: ['No', 'Si'],
      data: [85, 15],
      leyenda: '¿Le importa que le den gases?'
    }
  };

  constructor() {}

  ngOnInit() {}
}
