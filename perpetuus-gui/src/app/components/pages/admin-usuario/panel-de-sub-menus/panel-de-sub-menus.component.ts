import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DESCRIPCION_MENU } from 'src/app/models/usuario/usuario.model';
import { ControlBreadcrumbsService } from 'src/app/services/utiles/estructurales/control-breadcrumbs/control-breadcrumbs.service';

@Component({
  selector: 'app-panel-de-sub-menus',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './panel-de-sub-menus.component.html',
  styleUrl: './panel-de-sub-menus.component.scss'
})
export class PanelDeSubMenusComponent implements OnInit, OnDestroy {

  constructor(
    private breadcrumb_service: ControlBreadcrumbsService
  ) {
    
  }

  ngOnInit(): void {
    this.subscripcion_sub_menus = this.breadcrumb_service
      .estado_conjunto_sub_menus_disponibles$
      .subscribe({
        next: (sub_menus) => {
          this.sub_menus = sub_menus
        }
      })
    this.subscripcion_menu_actual = this.breadcrumb_service
      .estado_menu_actual$
      .subscribe({
        next: (menu) => {
          this.menu_actual = menu
        }
      })
  }
  
  ngOnDestroy(): void {
    try {
      this.subscripcion_sub_menus.unsubscribe()
    } catch (error) {
      console.debug('No se pudo desuscribir de los sub menus (panel sub-menus): ', error)
    }
    try {
      this.subscripcion_menu_actual.unsubscribe()
    } catch (error) {
      console.debug('No se pudo desuscribir al menu actual (panel sub-menus): ', error)
    }
  }
  
  private subscripcion_sub_menus!: Subscription
  private subscripcion_menu_actual!: Subscription
  sub_menus: DESCRIPCION_MENU[] = []
  menu_actual!: DESCRIPCION_MENU

}
