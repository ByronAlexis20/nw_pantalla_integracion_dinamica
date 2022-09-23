import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AdItem } from 'app/main/directivas/ad-item';
import { environment } from 'environments/environment';
import { VerificacionService } from 'app/auth/service';
import { FiltrosService } from 'app/auth/service/filtros.service';
import { ServicioService } from 'app/main/directivas/servicio.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Proceso } from 'app/auth/models/proceso';

@Component({
  selector: 'app-ordencompra',
  templateUrl: './ordencompra.component.html',
  styleUrls: ['./ordencompra.component.scss']
})
export class OrdencompraComponent implements OnInit, OnDestroy,AfterViewInit {
  
  titulo:string = ""
  info: AdItem[] = [];
  nomenclatura:string = "coc"
  urlComponentes = environment.apiUrlComponentes 

  constructor(
    private _http: HttpClient,
    private _filtrosService: FiltrosService,
    private servicioService: ServicioService,
    private _userService: VerificacionService,
  ) {

  }

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

  ngOnDestroy(): void {
  }
 
  ngAfterViewInit(): void {
  
  }

}