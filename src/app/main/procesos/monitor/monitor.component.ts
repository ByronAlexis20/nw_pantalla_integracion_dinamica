import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { takeUntil, timestamp } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreTranslationService } from '@core/services/translation.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MonitorComponent implements OnInit {
  
  socket = io(environment.apiUrlSockect);
  
  urlServicioIntegracion: string;
  private tempData = [];

  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  
  fechaActual:Date = new Date()

  public menTemp = [
    {
      "id":1,
      "mensaje":"hola"
    },
    {
      "id":2,
      "mensaje":"cola"
    },
    {
      "id":3,
      "mensaje":"lola"
    }
  ]
  public cabe = [
    "id","mensaje"
  ]

  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  constructor(
    private modalService: NgbModal,
    private _httpClient: HttpClient,
    private _coreTranslationService: CoreTranslationService) {
    this.urlServicioIntegracion = environment.apiUrlServicioIntegracion
    //this._coreTranslationService.translate(english, french, german, portuguese);
  }

  filterUpdate(event:any) {
    const val = event.target.value.toLowerCase();

    const temp = this.tempData.filter(function (d) {
      return d.proceso.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.kitchenSinkRows = temp;
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  capturar(e:any){
    if(e.target.value){
      let captura = e.target.value;
    }
  }

  modalOpenLG(modalLG:any,mensaje:any) {
    this.modalService.open(modalLG, {
      centered: true,
      size: 'lg'
    });
  }

  ngOnInit() {
    //this.currDate = this.dp.transform( new Date(), 'yyyy-MM-dd' );
   var date = new Date();
    const formatDate = (date:Date)=>{
      let tempMES = date.getMonth() + 1
      let envMes = ""
      if(tempMES<10){
        envMes = "0"+tempMES
      }else{
        envMes = ""+tempMES
      }
      let tempDia = date.getDate()
      let envDia = ""
      if(tempDia<10){
        envDia = "0"+tempDia
      }else{
        envDia = ""+tempDia
      }
      let formatted_date = date.getFullYear() + "-" + (envMes) + "-" + envDia
      return formatted_date;
    }
    let a = new Date()
   // Timestamp b = a.getTime()

    let urlTemp = this.urlServicioIntegracion+"/sap/listarIntegraciones/PH/"+formatDate(date)
    this._httpClient.get(urlTemp).subscribe((result:any )=> {
      //console.log("🚀 ~ file: datatables.component.ts ~ line 103 ~ DatatablesComponent ~ this._httpClient.get ~ result", result) 
    })
    
    let dataTemp = [
      {
        "id_integracion": 1,
        "proceso": "orden compra",
        "estado": 0,
        "mensaje": {
          "respuesta": "exito"
        }
      },
      {
        "id_integracion": 2,
        "proceso": "notificacion",
        "estado": 1,
        "mensaje": {
          "respuesta": "exito"
        }
      },
      {
        "id_integracion": 3,
        "proceso": "orden fabricacion",
        "estado": 2,
        "mensaje": {
          "respuesta": "exito"
        }
      }
    ]
    this.rows = dataTemp;
    this.tempData = this.rows;
    this.kitchenSinkRows = this.rows;
    this.obtenerData();
  }

  obtenerData(){
    this.socket.on('recibir-notificaciones',(notificaciones)=>{
      console.log("notificacion recibidas services",notificaciones);
    })
  }

}

/*
[
    {
        "ID_INTEGRACION": "PH537",
        "POSICION": "1",
        "FECHA_RESPUESTA": "20220912",
        "ESTATUS": "1",
        "PROCESO": "Orden de compra",
        "DETALLE": {
            "NOMBRE": "DANIEL"
        }
    }
]
*/