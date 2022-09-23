import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Proceso } from 'app/auth/models/proceso';
import { Componente } from 'app/auth/models/seguridad/componente';
import { VerificacionService } from 'app/auth/service';
import { FiltrosService } from 'app/auth/service/filtros.service';
import { AdItem } from 'app/main/directivas/ad-item';
import { ServicioService } from 'app/main/directivas/servicio.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entradamercancia',
  templateUrl: './entradamercancia.component.html',
  styleUrls: ['./entradamercancia.component.scss']
})
export class EntradamercanciaComponent implements OnInit {

  titulo:string = ""
  nomenclatura:string = "etm"
  itemsEntrada: AdItem[] = [];
  urlComponentes = environment.apiUrlComponentes 

  constructor(
    private _http: HttpClient,
    private servicioService: ServicioService,
    private _userService: VerificacionService,
    private _filtrosService: FiltrosService
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
          this.itemsEntrada = this.servicioService.getAds(data["data"]);
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
  }

}
