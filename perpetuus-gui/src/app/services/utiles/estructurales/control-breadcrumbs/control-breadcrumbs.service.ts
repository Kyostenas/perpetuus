import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Subscription, takeUntil } from 'rxjs';
import { DESCRIPCION_MENU } from 'src/app/models/usuario/usuario.model';
import { UtilidadesService } from '../../varios/utilidades/utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class ControlBreadcrumbsService {

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private utiles: UtilidadesService
  ) { }

  url_layout!: string

  private _menu_actual!: DESCRIPCION_MENU
  private _ruta_menus_actual: DESCRIPCION_MENU[] = []
  private _url_actual!: string[]
  // private _conjunto_links_sub_menus_disponibles!: string[]
  private _conjunto_sub_menus_disponibles!: DESCRIPCION_MENU[]
  private subscripcion_router!: Subscription
  private menus_en_revision!: DESCRIPCION_MENU[]
  private get menu_actual(): DESCRIPCION_MENU {
    return this._menu_actual
  }
  private get ruta_actual(): DESCRIPCION_MENU[] {
    return this._ruta_menus_actual
  }
  private get url_actual(): string[] {
    return this._url_actual
  }

  private _menu_actual_subject = 
    new BehaviorSubject<DESCRIPCION_MENU>(this.menu_actual)
  private _ruta_menus_actual_subject = 
    new BehaviorSubject<DESCRIPCION_MENU[]>(this._ruta_menus_actual)
  private _url_actual_subject = 
    new BehaviorSubject<string[]>(this.url_actual)
  private _conjunto_sub_menus_disponibles_subject = 
    new BehaviorSubject<DESCRIPCION_MENU[]>(this._conjunto_sub_menus_disponibles)
  
  estado_menu_actual$ = this._menu_actual_subject
    .asObservable()
  estado_ruta_menus_actual$ = this._ruta_menus_actual_subject
    .asObservable()
  estado_url_actual$ = this._url_actual_subject
    .asObservable()
  // estado_conjunto_links_sub_menus_disponibles$ = this._conjunto_links_sub_menus_disponibles_subject
  //   .asObservable()
  estado_conjunto_sub_menus_disponibles$ = this._conjunto_sub_menus_disponibles_subject
    .asObservable()

  subscribirse_a_los_cambios_de_url() {
    this.subscripcion_router = this.router.events
      .pipe(
        filter(
          (event: any): event is NavigationEnd => 
            event instanceof NavigationEnd
        )
      )
      // .pipe(takeUntil(this.estado_menu_actualizado$))
      .subscribe({
        next: (event) => {
          this._url_actual = event.urlAfterRedirects
            .split('?')[0].split('#')[0]
            .split('/').filter(segment => segment)
          this._url_actual_subject
            .next(this.url_actual)
          this.obtener_menus_actuales()
        }
      })
  }

  desuscribirse_cambios_url() {
    this.subscripcion_router.unsubscribe()
  }

  private obtener_menus_actuales() {
    if (!this.menus_en_revision) {
      this.menus_en_revision = this.utiles
        .consultar_local_storage('menus')
    }
    const URL_ACTUAL_SIN_LAYOUT = this.url_actual
    const URL_LAYOUT = URL_ACTUAL_SIN_LAYOUT.splice(0, 1)[0]
    if (this.url_layout !== URL_LAYOUT) {
      this.url_layout = URL_LAYOUT
    }
    let rutaDeMenus: DESCRIPCION_MENU[] = []
    let conjuntoMenusActual = this.menus_en_revision
    for (let iPasoRuta = 0; iPasoRuta < URL_ACTUAL_SIN_LAYOUT.length; iPasoRuta++) {
      const UN_ELEM_URL = URL_ACTUAL_SIN_LAYOUT[iPasoRuta];
      const MENU_CORR = <DESCRIPCION_MENU>conjuntoMenusActual
        .find(menu => menu.link === UN_ELEM_URL)
      rutaDeMenus.push(MENU_CORR)
      if (!!MENU_CORR?.sub_menus) {
        if (MENU_CORR.sub_menus.length > 0) {
          conjuntoMenusActual = MENU_CORR.sub_menus
        }
      }
    }
    // this._conjunto_links_sub_menus_disponibles = rutaDeMenus[rutaDeMenus.length - 1]
    this._menu_actual = rutaDeMenus[rutaDeMenus.length - 1]
    this._conjunto_sub_menus_disponibles = this.menu_actual?.sub_menus || []
    this._ruta_menus_actual = rutaDeMenus
    this._ruta_menus_actual_subject
      .next(this._ruta_menus_actual)
    this._menu_actual_subject.next(this._menu_actual)
    // this._conjunto_links_sub_menus_disponibles_subject
    //   .next(this._conjunto_links_sub_menus_disponibles)
    this._conjunto_sub_menus_disponibles_subject
      .next(this._conjunto_sub_menus_disponibles)
  }

}
