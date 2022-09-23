import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Componente } from 'app/auth/models/seguridad/componente';
import { FiltrosService } from 'app/auth/service/filtros.service';
import { AdComponent } from '../../ad.component';

@Component({
  selector: 'app-datebox',
  templateUrl: './datebox.component.html',
  styleUrls: ['./datebox.component.scss']
})
export class DateboxComponent implements OnInit,AdComponent {

  data:any;
  id:string = "";
  tipo:string = "";
  nombre:string = "";
  ancho:number = 0;
  fechaActual:Date = new Date()

  constructor(
    private _filtrosService: FiltrosService
  ) { }

  ngOnInit(): void {
    this.ancho = this.data.data.ancho; 
    this.nombre = this.data.data.label;
    this.tipo = this.data.data.tipodato;
    this.id = this.data.data.idnwicomponente;
  }

  capturar(idd:any,e:any){
    let captura = null;
    if(e.target.value){
      captura = e.target.value
      console.log("fecha de evento",captura);
    }
    let tempFiltros = this._filtrosService.filtrosValue;
    if(tempFiltros){
      tempFiltros.forEach(function(elemt:Componente) {
        if (elemt.idnwicomponente == idd) {
          elemt.resultado=captura
        }
      });
      this._filtrosService.asignacion(tempFiltros);
    }
  }
}
