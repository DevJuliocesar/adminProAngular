import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() progreso: number = 10;
  @Input() leyenda: string;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onChanges(newValue: number) {

    this.progreso = (newValue >= 100) ? 100 : ((newValue <= 0) ? 0 : newValue);

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(value: number = 5) {
    if (this.progreso >= 100 && value > 0) return this.progreso = 100;

    if (this.progreso <= 0 && value < 0) return this.progreso = 0;

    this.progreso += value;

    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();

  }

}
