import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Api } from 'app/auth/models/seguridad/api';
import { Componente } from 'app/auth/models/seguridad/componente';
import { FiltrosService } from 'app/auth/service/filtros.service';
import { AdComponent } from '../../ad.component';
import { DataList } from 'app/auth/models/seguridad/dataList';
import { Padre } from 'app/auth/models/seguridad/padre';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit,AdComponent {
  
  data: any;
  valor:any;
  id:number = 0;
  tag:string = "";
  urlProceso: Api;
  tipo:string = "";
  ancho:number = 0;
  holder:string = "";
  nombre: string = "";
  estado:boolean = true;
  dependencias:number[];
  visible:boolean = false;
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
        if(this.dependencias){
          if(this.dependencias.length == 1){
            let temp = x.find(element=>element.idnwicomponente==this.dependencias[0])
            if(temp){
              switch (temp.tipodato) {
                case "array":
                  if(temp.resultado){
                    let datTmp:DataList = temp.resultado
                    this.valor = datTmp.respuestaHijo[this.tag]
                  }else{
                    this.valor = ""
                  }
                  break;
                default:
                  if(temp.resultado){
                    this.valor = temp.resultado
                  }else{
                    this.valor = ""
                  }
                  break;
              }
            }
          }else{
            let resultados = {};
            this.dependencias.forEach(element => {
              let  resultTemp = x.find(comp=>comp.idnwicomponente==element)
              if(resultTemp){
                switch (resultTemp.tipodato) {
                  case "array":
                    if(resultTemp.resultado){
                      let datTemp:DataList = resultTemp.resultado
                      resultados[resultTemp.tag] = datTemp.respuestaHijo[this.tag]
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
            if(Object.entries(resultados).length === this.dependencias.length){
              this._http.post(this.urlProceso.url,resultados).subscribe(dataR => {
                console.log("vamos bien",dataR)
                console.log("vamos bien",resultados)
                if(dataR["status"] == "error"){
                  this.valor = ""
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: dataR["mensaje"]
                  })
                  return
                }
                this.valor = dataR["respuesta"]
              })
            }else{
              this.valor = ""
            }
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.tag = this.data.data.tag; 
    this.ancho = this.data.data.ancho; 
    this.nombre = this.data.data.label; 
    this.tipo = this.data.data.tipodato;
    this.estado = this.data.data.disabled; 
    this.visible = this.data.data.visible;
    this.urlProceso = this.data.data.nwiApi;
    this.id = this.data.data.idnwicomponente;
    this.holder = this.data.data.defaultValue;
    this.padre = this.data.data.componentesHijos;
    this.dependencias = this.data.data.idnwiparametrodependencias;
  }

  capturar(idt:any,e:any){
    let captura = null;
    let tempTipo = ""
    if(e.target.value){
      captura = e.target.value
      tempTipo = this.tipo
    }
    let tempFiltros = this._filtrosService.filtrosValue;
    if(tempFiltros){
      tempFiltros.forEach(function(elemt:Componente) {
        if (elemt.idnwicomponente == idt) {
          elemt.resultado=captura
        }
      });
      this._filtrosService.asignacion(tempFiltros);
    }
  }
}