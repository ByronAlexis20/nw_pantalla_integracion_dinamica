import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AdItem } from 'app/main/directivas/ad-item';
import { environment } from 'environments/environment';
import { VerificacionService } from 'app/auth/service';
import { Encabezado } from 'app/auth/models/seguridad/encabezado';
import { FiltrosService } from 'app/auth/service/filtros.service';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServicioService } from 'app/main/directivas/servicio.service';
import { NotificacionService } from './notificacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proceso } from 'app/auth/models/proceso';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificacionComponent implements OnInit {

  titulo:string = "";
  camposCabecera: any[];
  cabeceras: Encabezado[];
  ColumnMode = ColumnMode;
  notificaciones:any[] = [];
  titulo_detalle:string = "";
  nomenclatura:string = "ntf";
  cabecera_detalle:any[] = [];
  cabecerasSeleccionadas = [];
  SelectionType = SelectionType;
  notificacion_detalle:any[] = [];
  allSelectedRows:boolean = false;
  itemsNotificacion: AdItem[] = [];
  urlComponentes = environment.apiUrlComponentes 

  prueba = [
    {
        "descripcion": "LOTE_COCINA",
        "descripcion_usuario": "COCINA",
        "vista_usuario": 1,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "POSICION",
        "descripcion_usuario": "POSICION",
        "vista_usuario": 0,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "NUM_COCHE",
        "descripcion_usuario": "NUM_COCHE",
        "vista_usuario": 0,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "ORDEN_PP_SAP",
        "descripcion_usuario": "ORDEN",
        "vista_usuario": 1,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "OPERACION_FASE",
        "descripcion_usuario": "OPERACION",
        "vista_usuario": 1,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "RESOURCE",
        "descripcion_usuario": "RESOURCE",
        "vista_usuario": 0,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "CANTIDAD_TOTAL",
        "descripcion_usuario": "CANTIDAD",
        "vista_usuario": 1,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "FECHA_INICIO_PROC",
        "descripcion_usuario": "FECHA_INICIO_PROC",
        "vista_usuario": 0,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "HORA_INICIO_PROC",
        "descripcion_usuario": "HORA_INICIO_PROC",
        "vista_usuario": 0,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "FECHA_FIN_PROC",
        "descripcion_usuario": "FECHA_FIN_PROC",
        "vista_usuario": 0,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "HORA_FINC_PROC",
        "descripcion_usuario": "HORA_FINC_PROC",
        "vista_usuario": 0,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "TIEMPO_CALCULADO",
        "descripcion_usuario": "TIEMPO_CALCULADO",
        "vista_usuario": 0,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "CLASE_CARACTERISTICA",
        "descripcion_usuario": "CLASE CARACTERISTICA",
        "vista_usuario": 1,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "CATEGORIA",
        "descripcion_usuario": "CATEGORIA",
        "vista_usuario": 1,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "TIPO_NOTIFICACION",
        "descripcion_usuario": "TIPO DE NOTIFICACION",
        "vista_usuario": 1,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "DETALLE_LOTES_SAP",
        "descripcion_usuario": "DETALLE LOTES",
        "vista_usuario": 1,
        "vista_enviar": 1,
        "discriminar_vacio": false
    },
    {
        "descripcion": "TB_ACTIVIDADES",
        "descripcion_usuario": "ACTIVIDADES",
        "vista_usuario": 1,
        "vista_enviar": 1,
        "discriminar_vacio": false
    }
  ]

  pruebata = [
    {
      "LOTE_COCINA": "1",
      "NUM_COCHE": "",
      "ORDEN_PP_SAP": "",
      "OPERACION_FASE": "0020",
      "RESOURCE": "A_DESCON",
      "CANTIDAD_TOTAL": "239",
      "FECHA_INICIO_PROC": "",
      "HORA_INICIO_PROC": "",
      "FECHA_FIN_PROC": "",
      "HORA_FINC_PROC": "",
      "TIEMPO_CALCULADO": "",
      "CLASE_CARACTERISTICA": "",
      "CATEGORIA": "",
      "TIPO_NOTIFICACION": "",
      "DETALLE_LOTES_SAP": [
          {
              "LOTE_COCINA": "1",
              "TIPO_MOVIMIENTO": "261",
              "LOTE_CAJON_SAP": "0003093290",
              "DENOM_COMP": "",
              "ORDEN_PP_SAP": "KG",
              "CANTIDAD": "239"
          }
      ],
      "TB_ACTIVIDADES": [
          {
              "CONF_ACTI_UNIT": "H",
              "CONF_ACTIVITY": "22.200",
              "NUM_ACTIVIDAD": "1"
          },
          {
              "CONF_ACTI_UNIT": "H",
              "CONF_ACTIVITY": "22.200",
              "NUM_ACTIVIDAD": "2"
          },
          {
              "CONF_ACTI_UNIT": "H",
              "CONF_ACTIVITY": "22.200",
              "NUM_ACTIVIDAD": "3"
          },
          {
              "CONF_ACTI_UNIT": "H",
              "CONF_ACTIVITY": "11.100",
              "NUM_ACTIVIDAD": "4"
          },
          {
              "CONF_ACTI_UNIT": "",
              "CONF_ACTIVITY": "",
              "NUM_ACTIVIDAD": "5"
          },
          {
              "CONF_ACTI_UNIT": "",
              "CONF_ACTIVITY": "",
              "NUM_ACTIVIDAD": "6"
          }
      ],
      "POSICION": 3,
      "estado_busqueda": 0,
      "ultima_posicion": 0,
      "respuesta": null,
      "status": false
    },
    {
        "LOTE_COCINA": "2",
        "NUM_COCHE": "",
        "ORDEN_PP_SAP": "",
        "OPERACION_FASE": "0020",
        "RESOURCE": "A_DESCON",
        "CANTIDAD_TOTAL": "239",
        "FECHA_INICIO_PROC": "",
        "HORA_INICIO_PROC": "",
        "FECHA_FIN_PROC": "",
        "HORA_FINC_PROC": "",
        "TIEMPO_CALCULADO": "",
        "CLASE_CARACTERISTICA": "",
        "CATEGORIA": "",
        "TIPO_NOTIFICACION": "",
        "DETALLE_LOTES_SAP": [
            {
                "LOTE_COCINA": "1",
                "TIPO_MOVIMIENTO": "261",
                "LOTE_CAJON_SAP": "0003093290",
                "DENOM_COMP": "",
                "ORDEN_PP_SAP": "KG",
                "CANTIDAD": "239"
            }
        ],
        "TB_ACTIVIDADES": [
            {
                "CONF_ACTI_UNIT": "H",
                "CONF_ACTIVITY": "22.200",
                "NUM_ACTIVIDAD": "1"
            },
            {
                "CONF_ACTI_UNIT": "H",
                "CONF_ACTIVITY": "22.200",
                "NUM_ACTIVIDAD": "2"
            },
            {
                "CONF_ACTI_UNIT": "H",
                "CONF_ACTIVITY": "22.200",
                "NUM_ACTIVIDAD": "3"
            },
            {
                "CONF_ACTI_UNIT": "H",
                "CONF_ACTIVITY": "11.100",
                "NUM_ACTIVIDAD": "4"
            },
            {
                "CONF_ACTI_UNIT": "",
                "CONF_ACTIVITY": "",
                "NUM_ACTIVIDAD": "5"
            },
            {
                "CONF_ACTI_UNIT": "",
                "CONF_ACTIVITY": "",
                "NUM_ACTIVIDAD": "6"
            }
        ],
        "POSICION": 4,
        "estado_busqueda": 1,
        "ultima_posicion": 0,
        "respuesta": null,
        "status": true
      }
  ]
  constructor(
    private _http: HttpClient,
    private modalService: NgbModal,
    private _filtrosService: FiltrosService,
    private servicioService: ServicioService,
    private _userService: VerificacionService,
    private notificacionService: NotificacionService
  ) { }
  
  ngOnInit(): void {
    this._filtrosService.asignacion(null)
    const user = this._userService.userValue;
    if (user) {
      console.log("ingreso entrada",user)
      let tempProceso = user.procesos.find((tp:Proceso) => tp.codproceso == this.nomenclatura);
      if(tempProceso){
        this.titulo = tempProceso.titulo
      }
      let url = this.urlComponentes+"/listarComponentes/"+user.planta.codplanta+"/"+this.nomenclatura
      this._http.get(url).subscribe(data => {
        if(data["estado"]=="ok"){
          this.itemsNotificacion = this.servicioService.getAds(data["data"]);
          this._filtrosService.asignacion(data["data"])
          return
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data["mensaje"]
        })
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un problema con el servidor consulte a sistemas'
        })
      })
    }
    this.cabeceras = this.prueba;
    this.camposCabecera = this.notificacionService.encabezado(this.prueba);
    this.notificaciones = this.pruebata
  }

  nameColumna(row: any,col: any) {
    let dato: any;
    this.cabeceras.forEach((element: Encabezado) => {
      if (element.descripcion_usuario == col) {
        dato = row[element.descripcion]
      }
    });
    return dato;
  }

  isArray(dato: any) {
    return Array.isArray(dato);
  }

  notificar() {
    console.log("estamos notificando",this.cabecerasSeleccionadas)
  }

  checkedRow(row:any) {
    return row.status
  }

  onCheckboxChangeRow(event:any,row:any) {
    if(event.target.checked){
      this.cabecerasSeleccionadas.push(row)
    }else{
      this.cabecerasSeleccionadas = this.cabecerasSeleccionadas.filter(x=>x.POSICION !== row.POSICION)
    }
    this.notificaciones.forEach(
      function(noti, index) {
        if(noti.POSICION == row.POSICION){
          noti.status = event.target.checked
        }
      }
    )
    let control = true
    this.notificaciones.forEach(element => {
      if(!element.status){
        control = false
      }
    });
    this.allSelectedRows = control
  }

  onCheckboxChangeAllRow(event:any,notificaciones:any[]) {
    console.log("cambioall ",event.target.checked)
    let cabTemp:any[] = []
    notificaciones.forEach(
      function(noti, index) {
        if(noti.estado_busqueda !== 1){
          console.log("noti ",noti.POSICION)
          noti.status = event.target.checked
          if(event.target.checked){
            cabTemp.push(noti)
          }
        }
      }
    )
    this.cabecerasSeleccionadas = cabTemp
  }

  disabledRow(row:any) {
    if(row.status && row.estado_busqueda == 1){
      return true
    }
    return false
  }

  obtenerEncabezados(object:any) {
    return Object.keys(object)
  }

  modalOpenLG(modalLG:any,titulo:any,data:any) {
    this.titulo_detalle = titulo
    let mop = [
      {
          "LOTE_COCINA": "1",
          "TIPO_MOVIMIENTO": "261",
          "LOTE_CAJON_SAP": "0003093290",
          "DENOM_COMP": "",
          "ORDEN_PP_SAP": "KG",
          "CANTIDAD": "239"
      }
  ]
  let mcc = [
    "LOTE_COCINA",
    "TIPO_MOVIMIENTO",
    "LOTE_CAJON_SAP",
    "DENOM_COMP",
    "ORDEN_PP_SAP",
    "CANTIDAD"
]
    if(data){
      this.notificacion_detalle = data
      this.cabecera_detalle = Object.keys(data[0])
      //this.cabecera_detalle = mcc
    }
    this.modalService.open(modalLG, {
      centered: true,
      size: 'lg'
    });
  }

  dataDetalle(col:any,data:any){
    return data[col]
  }
}