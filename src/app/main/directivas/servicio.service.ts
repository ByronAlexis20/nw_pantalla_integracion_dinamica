import { AdItem } from './ad-item';
import { Injectable } from '@angular/core';
import { Componente } from 'app/auth/models/seguridad/componente';
import { ListboxComponent } from './componentes/listbox/listbox.component';
import { TextboxComponent } from './componentes/textbox/textbox.component';
import { DateboxComponent } from './componentes/datebox/datebox.component';
import { ButtonComponent } from './componentes/button/button.component';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor() { }

  getAds(array: Componente[]) {
    let arrayTemp = []
    if (array.length > 0) {
      array.forEach(element => {
        switch (element.codobjeto) {
          case "LBX":
            arrayTemp.push(
              new AdItem(
                ListboxComponent,
                { data: element }
              ),
            )
            break;
          case "DTX":
            //element.resultado = new Date();
            arrayTemp.push(
              new AdItem(
                DateboxComponent,
                { data: element }
              ),
            )
            break;
          case "TBX":
            arrayTemp.push(
              new AdItem(
                TextboxComponent,
                { data: element }
              ),
            )
            break;
          case "BTN":
            arrayTemp.push(
              new AdItem(
                ButtonComponent,
                { data: element }
              ),
            )
            break;
          default:
            break;
        }
      });
    }
    return arrayTemp;
  }
}
