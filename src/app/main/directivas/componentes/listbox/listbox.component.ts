import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Componente } from 'app/auth/models/seguridad/componente';
import { DataList } from 'app/auth/models/seguridad/dataList';
import { FiltrosService } from 'app/auth/service/filtros.service';
import { AdComponent } from '../../ad.component';
import { Api } from 'app/auth/models/seguridad/api';
import { Padre } from 'app/auth/models/seguridad/padre';

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss']
})
export class ListboxComponent implements OnInit,AdComponent {

  data: any;
  id:number = 0
  ancho:number=0
  urlProceso: Api;
  element:number=0
  nombre:string = ""
  iddepenencia:any[];
  visible:boolean = false;
  listaElement:DataList[] = []
  padre:Padre;
  
  constructor(
    private _http: HttpClient,
    private _filtrosService: FiltrosService
  ) { 
    this._filtrosService.filtros.subscribe(x => {
      if(x){
        if(this.padre){
          let tempPadre = x.find(element=>element.idnwicomponente==this.padre.parametro)
          if(tempPadre){
            if(tempPadre.resultado){
              let tempPadreResultado:DataList = tempPadre.resultado
              if(tempPadreResultado){
                let respuestaPadre:Padre = tempPadreResultado.respuestaHijo
                if(respuestaPadre.campo === this.padre.campo){
                  console.log("se puede habilitar ",this.padre.parametro)
                  this.visible = true
                }else{
                  this.visible = false
                }
              }
            }else{
              this.visible = false
            }
          }
        }
        if(this.iddepenencia){
          let resultados = new Object();
          this.iddepenencia.forEach(element => {
            let  resultTemp = x.find(comp=>comp.idnwicomponente==element)
            if(resultTemp){
              switch (resultTemp.tipodato) {
                case "json":
                  if(resultTemp.resultado){
                    resultados[resultTemp.tag] = resultTemp.resultado["respuestaHijo"]
                  }
                  break;
                case "date":
                  if(resultTemp.resultado){
                    resultados[resultTemp.tag] = resultTemp.resultado
                  }
                  break;
                default:
                  resultados[resultTemp.tag] = resultTemp.resultado
                  break;
              }
            }
          });
          if(Object.entries(resultados).length === this.iddepenencia.length){
            this._http.post(this.urlProceso.url,resultados).subscribe(dataR => {
              if(dataR["status"] == "error"){
                this.listaElement = []
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: dataR["mensaje"]
                })
                return
              }
              this.listaElement = dataR["respuesta"]
            })
          }else{
            this.listaElement = []
          }
        }
      }
    })
  }
  
  ngOnInit(): void {
    this.ancho = this.data.data.ancho;
    this.nombre = this.data.data.label; 
    this.visible = this.data.data.visible;
    this.urlProceso = this.data.data.nwiApi;
    this.id = this.data.data.idnwicomponente;
    this.padre = this.data.data.componentesHijos;
    let num:any[] = this.data.data.idnwiparametrodependencias;
    this.iddepenencia = this.data.data.idnwiparametrodependencias;
    if(num.length==0){
      this._http.get(this.data.data.nwiApi.url).subscribe((dataR:DataList[] )=> {
        if(this.data.data.nwiApi.idnwiapi == 15){
          console.log("lista 15 ",dataR)
          let ot = [
            {
              "id": 1,
              "descripcion": "campo a",
              "respuestaHijo": {
                "campo": "f"
              },
              "data": {
                "id": 1
              }
            },
            {
              "id": 2,
              "descripcion": "campo b",
              "respuestaHijo": {
                "campo": "d"
              },
              "data": {
                "id": 2
              }
            },
            {
              "id": 3,
              "descripcion": "campo c",
              "respuestaHijo": {
                "campo": "d"
              },
              "data": {
                "id": 3
              }
            }
          ]
          dataR = ot;
        }
        this.listaElement = dataR
      })
    }
  }

  capturar(idl:any){
    let valor = this.element
    let tempListaData = this.listaElement
    let tempFiltros = this._filtrosService.filtrosValue;
    if(tempFiltros){
      tempFiltros.forEach(function(elemt:Componente) {
        if (elemt.idnwicomponente == idl) {
          if(valor){
            let resultData = tempListaData.find((itemData:DataList)=>itemData.id==valor)
            elemt.resultado=resultData
          }else{
            elemt.resultado=null
          }
        }
      });
      this._filtrosService.asignacion(tempFiltros);
    }
  }

}