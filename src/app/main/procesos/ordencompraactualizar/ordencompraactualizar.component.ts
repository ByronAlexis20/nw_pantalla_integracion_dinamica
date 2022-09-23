import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Proceso } from 'app/auth/models/proceso';
import { Componente } from 'app/auth/models/seguridad/componente';
import { VerificacionService } from 'app/auth/service';
import { FiltrosService } from 'app/auth/service/filtros.service';
import { AdItem } from 'app/main/directivas/ad-item';
import { ServicioService } from 'app/main/directivas/servicio.service';
import { error } from 'console';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordencompraactualizar',
  templateUrl: './ordencompraactualizar.component.html',
  styleUrls: ['./ordencompraactualizar.component.scss']
})
export class OrdencompraactualizarComponent implements OnInit, OnDestroy,AfterViewInit  {

  titulo:string = ""
  info: AdItem[] = [];
  nomenclatura:string = "aoc"
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
      let tempProceso = user.procesos.find((tp:Proceso) => tp.codproceso == this.nomenclatura);
      if(tempProceso){
        this.titulo = tempProceso.titulo
      }
      let url = this.urlComponentes+"/listarComponentes/"+user.planta.codplanta+"/"+this.nomenclatura
      this._http.get(url).subscribe(data => {
        if(data["estado"]=="ok"){
          this.info = this.servicioService.getAds(data["data"]);
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

  ngAfterViewInit(): void {
  }
  
  ngOnDestroy(): void {
  }
  
}
