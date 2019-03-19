import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscripcion: Subscription;

  constructor() {}

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  ngOnInit() {
    this.subscripcion = this.regresaObs()
      .pipe(
        map(resp => resp.valor),
        filter((valor, index) => {
          if (valor % 2 === 0) {
            return false;
          }
          return true;
        })
      )
      .subscribe(
        numero => console.log('subs: ', numero),
        error => console.log('error', error),
        () => console.log('El observador termino!')
      );
  }

  regresaObs(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;

        observer.next({
          valor: contador
        });

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    });
  }
}
