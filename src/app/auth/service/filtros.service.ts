import { Injectable } from '@angular/core';
import { Componente } from './../models/seguridad/componente';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  private filtrosSubject: BehaviorSubject<Componente[]>;
  public filtros: Observable<Componente[]>;

  constructor() {
    this.filtrosSubject = new BehaviorSubject<Componente[]>(null);
    this.filtros = this.filtrosSubject.asObservable();
  }

  public get filtrosValue(): Componente[] {
    return this.filtrosSubject.value;
  }

  asignacion(arry:Componente[]){
      this.filtrosSubject.next(arry);
  }

}