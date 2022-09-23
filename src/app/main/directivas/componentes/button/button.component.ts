import Swal from 'sweetalert2';
import { AdComponent } from '../../ad.component';
import { Component, OnInit } from '@angular/core';
import { Componente } from 'app/auth/models/seguridad/componente';
import { FiltrosService } from 'app/auth/service/filtros.service';
import { Api } from 'app/auth/models/seguridad/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit,AdComponent {

  data: any;
  id: string = ""
  ancho: number = 0
  accion: string = ""
  nombre: string = ""
  urlProceso: Api
  iddepenencia:any[];

  constructor(
    private _http: HttpClient,
    private _filtrosService: FiltrosService
  ) {
  }

  ngOnInit(): void {
    this.ancho = this.data.data.ancho;
    this.nombre = this.data.data.label;
    this.accion = this.data.data.accion;
    this.urlProceso = this.data.data.nwiApi;
    this.id = this.data.data.idnwicomponente;
    this.iddepenencia = this.data.data.idnwiparametrodependencias;
  }

  proceso(idb:any){
    let tempFiltros = this._filtrosService.filtrosValue;
    let jsonEnvio = new Object();
    let contadorResultados = 0;
    /*tempFiltros.forEach(function(elemt:Componente) {
      
    });*/
    if(this.id === idb){
      if(this.iddepenencia.length>0){
        for (let index = 0; index < this.iddepenencia.length; index++) {
          const sub = this.iddepenencia[index];
          let subTemp = tempFiltros.find(x => x.idnwicomponente === sub);
          if(subTemp.resultado){
            contadorResultados = contadorResultados + 1;
            switch (subTemp.tipodato) {
              case "array":
                jsonEnvio[subTemp.tag] = subTemp.resultado.data
                break;
              case "number":
                let num = Number(subTemp.resultado).toFixed(2)
                let numTemp = Number(num)
                jsonEnvio[subTemp.tag] = numTemp
                break;
              default:
                jsonEnvio[subTemp.tag] = subTemp.resultado
                break;
            }
          }else{
            console.log("json error",jsonEnvio)
            Swal.fire({
              icon: 'error',
              title: 'Campo Pendiente',
              text: 'Falta '+subTemp.label
            })
            return
          }
        }
      }
    }
    if(contadorResultados == this.iddepenencia.length){
      switch (this.urlProceso.tipo_metodo) {
        case "GET":
          console.log("button get",jsonEnvio)
          break;
        case "POST":
          console.log("accion button",this.accion)
          if(this.accion){
            jsonEnvio["accion"]=this.accion
          }
          console.log("json envio exito",jsonEnvio)
          this._http.post(this.urlProceso.url,jsonEnvio).subscribe(dataR => {
            console.log("resouesta recibida",dataR)
            if(dataR["data"].estado == "ok"){
              Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: dataR["data"].mensaje
              })
              return
            }
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: dataR["data"].mensaje
            })
          })
          break;
        default:
          break;
      }
    }
  }
}
