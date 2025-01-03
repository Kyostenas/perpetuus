import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { BootstrapDropdownDirective } from 'src/app/directives/utiles/varios/bootstrap-dropdown.directive';
import { DESCRIPCION_MENU } from 'src/app/models/usuario/usuario.model';
import { ControlBreadcrumbsService } from 'src/app/services/utiles/estructurales/control-breadcrumbs/control-breadcrumbs.service';
import { ObtenerListadoSubMenusDropDownBreadCrumbsPipe } from '../_pipes-para-barras/obtener-listado-sub-menus-drop-down-bread-crumbs/obtener-listado-sub-menus-drop-down-bread-crumbs.pipe';

@Component({
  selector: 'app-barra-breadcrumbs',
  standalone: true,
  imports: [
    KeyValuePipe,
    CommonModule,
    RouterModule,
    BootstrapDropdownDirective,
    ObtenerListadoSubMenusDropDownBreadCrumbsPipe,
  ],
  templateUrl: './barra-breadcrumbs.component.html',
  styleUrl: './barra-breadcrumbs.component.scss'
})
export class BarraBreadcrumbsComponent implements OnInit, OnDestroy {

  constructor(
    private breadcrumbService: ControlBreadcrumbsService,
  ) {}
  
  ngOnInit(): void {
    this.suscribirse_menus_actuales()
  }

  ngOnDestroy(): void {
    this.subscripcion_list_menus.unsubscribe()
    this.subscripcion_menu_actual.unsubscribe()
    this.subscripcion_sub_menus_actual.unsubscribe()
  }

  private _lista_menu_actuales!: {[ key: string]: DESCRIPCION_MENU }
  private _menu_actual!: DESCRIPCION_MENU
  private _sub_menus_disponibles!: DESCRIPCION_MENU[]
  private subscripcion_list_menus!: Subscription
  private subscripcion_menu_actual!: Subscription
  private subscripcion_sub_menus_actual!: Subscription
  
  get menus_actuales(): {[ key: string]: DESCRIPCION_MENU } {
    return this._lista_menu_actuales
  }

  get menu_actual(): DESCRIPCION_MENU {
    return this._menu_actual
  }

  suscribirse_menus_actuales() {
    this.subscripcion_list_menus = this.breadcrumbService
      .estado_conjunto_menus_actual$
      .subscribe({
        next: (lista_actual) => {
          this._lista_menu_actuales = lista_actual
        }
      })
    this.subscripcion_menu_actual = this.breadcrumbService
      .estado_menu_actual$
      .subscribe({
        next: (menu_actual) => {
          this._menu_actual = menu_actual
        }
      })
    this.subscripcion_sub_menus_actual = this.breadcrumbService
      .estado_conjunto_sub_menus_disponibles$
      .subscribe({
        next: (sub_menus) => {
          this._sub_menus_disponibles = sub_menus
        }
      })
  }
  
}
