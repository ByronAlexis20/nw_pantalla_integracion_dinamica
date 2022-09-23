import { NgModule } from '@angular/core';
import { EntradaMercanciaModule } from './entradamercancia/entradamercancia.module';

import { MonitorModule } from './monitor/monitor.module';
import { NotificacionModule } from './notificacion/notificacion.module';
import { OrdenCompraModule } from './ordencompra/ordencompra.module';
import { OrdenFabricacionModule } from './ordencompraactualizar/ordencompraactualizar.module';
import { OrdenCompraActualizarModule } from './ordenfabricacion/ordenfabricacion.module';

@NgModule({
  declarations: [],
  imports: [
    MonitorModule,
    OrdenCompraModule,
    NotificacionModule,
    EntradaMercanciaModule,
    OrdenFabricacionModule,
    OrdenCompraActualizarModule
  ]
})
export class ProcesoModule {}
