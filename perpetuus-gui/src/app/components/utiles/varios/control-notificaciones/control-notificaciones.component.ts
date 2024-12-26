import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { BootstrapHideAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-hide-auto/bootstrap-hide-auto.directive';
import { BootstrapShowAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-show-auto/bootstrap-show-auto.directive';
import { EspecificacionServicioNotificacion } from 'src/app/models/utiles/varios/control-notificaciones/control-notificaciones.model';
import { ControlNotificacionesService } from 'src/app/services/utiles/varios/control-notificaciones/control-notificaciones.service';

@Component({
  selector: 'app-control-notificaciones',
  standalone: true,
  imports: [
    BootstrapShowAutoDirective,
    BootstrapHideAutoDirective,
  ],
  templateUrl: './control-notificaciones.component.html',
  styleUrl: './control-notificaciones.component.scss'
})
export class ControlNotificacionesComponent implements OnInit, OnDestroy{

  constructor(
    public controlNotifs: ControlNotificacionesService,
  ) {}

  notificaciones!: EspecificacionServicioNotificacion
  private subscripcionNotificaciones!: Subscription

  ngOnDestroy(): void {
    this.subscripcionNotificaciones.unsubscribe()
  }
  
  ngOnInit(): void {
    this.subscripcionNotificaciones = 
      this.controlNotifs.estado_notificaciones$.subscribe({
        next: (notificaciones) => {
          this.notificaciones = notificaciones
        },
        error: (error) => {

        }
      })
  }

}
