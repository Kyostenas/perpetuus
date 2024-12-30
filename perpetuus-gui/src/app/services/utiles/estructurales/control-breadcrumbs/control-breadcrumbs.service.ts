import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { BehaviorSubject, filter, Subscription } from 'rxjs';
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

  // ngOnDestroy(): void {
  //   try {
  //     this.desuscribirse_cambios_url()
  //   } catch (error) {
  //     console.debug('No se pudo eliminar la subscripción a la url (breadcrumbs): ' + error)
  //   }
  // }

  private _menu_actual!: DESCRIPCION_MENU
  private _conjunto_menus_actual: {[ key: string ]: DESCRIPCION_MENU } = {}
  private _url_actual!: string[]
  private _conjunto_links_sub_menus_disponibles!: string[]
  private _conjunto_sub_menus_disponibles!: DESCRIPCION_MENU[]
  private subscripcion_router!: Subscription
  get menu_actual(): DESCRIPCION_MENU {
    return this._menu_actual
  }
  get ruta_actual(): {[ key: string ]: DESCRIPCION_MENU } {
    return this._conjunto_menus_actual
  }
  get url_actual(): string[] {
    return this._url_actual
  }

  private _menu_actual_subject = 
    new BehaviorSubject<DESCRIPCION_MENU>(this.menu_actual)
  private _conjunto_menus_actual_subject = 
    new BehaviorSubject<{[ key: string ]: DESCRIPCION_MENU }>(this._conjunto_menus_actual)
  private _url_actual_subject = 
    new BehaviorSubject<string[]>(this.url_actual)
  private _conjunto_links_sub_menus_disponibles_subject = 
    new BehaviorSubject<string[]>(this._conjunto_links_sub_menus_disponibles)
  private _conjunto_sub_menus_disponibles_subject = 
    new BehaviorSubject<DESCRIPCION_MENU[]>(this._conjunto_sub_menus_disponibles)
  
  estado_menu_actual$ = this._menu_actual_subject
    .asObservable()
  estado_conjunto_menus_actual$ = this._conjunto_menus_actual_subject
    .asObservable()
  estado_url_actual$ = this._url_actual_subject
    .asObservable()
  estado_conjunto_links_sub_menus_disponibles$ = this._conjunto_links_sub_menus_disponibles_subject
    .asObservable()
  estado_conjunto_sub_menus_disponibles$ = this._conjunto_sub_menus_disponibles_subject
    .asObservable()

  subscribirse_a_los_cambios_de_url() {
    this.subscripcion_router = this.router.events
      .pipe(
        filter(
          (event: any): event is NavigationEnd => 
            event instanceof NavigationEnd
        )
      ).subscribe({
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

  private menus_en_revision!: DESCRIPCION_MENU[]

  obtener_menus_actuales(
    eliminar_conjunto_actual: boolean = true,
    obtener_actuales_desde_sub_grupo: boolean = false,
    link_menu_sub_grupo: string | null = null,
  ) {
    this._conjunto_links_sub_menus_disponibles = []
    this._conjunto_sub_menus_disponibles = []
    if (eliminar_conjunto_actual) {
      this._conjunto_menus_actual = {}
    }
    if (!obtener_actuales_desde_sub_grupo) {
      this.menus_en_revision = this.utiles
        .consultar_local_storage('menus')
    } else {
      if (!!link_menu_sub_grupo && !!this._conjunto_sub_menus_disponibles) {
        this.menus_en_revision = this._conjunto_sub_menus_disponibles
        this._conjunto_links_sub_menus_disponibles = []
      }
    }
    this.menus_en_revision
      .forEach((menu: DESCRIPCION_MENU) => {
        if(this._url_actual.includes(menu.link)) {
          this._conjunto_menus_actual[menu.link] = menu
          this._menu_actual = menu
          if (!!menu.sub_menus) {
            this._conjunto_links_sub_menus_disponibles
              = menu.sub_menus.map(menu => menu.link)
          }
          if (!!menu.sub_menus) {
            this._conjunto_sub_menus_disponibles = menu.sub_menus
          }
        } else {
          if (!!this._conjunto_sub_menus_disponibles) {
            if (this._conjunto_sub_menus_disponibles.length > 0) {
              this.obtener_menus_actuales(false, true)
            }
          }
        }
      })
    this._conjunto_menus_actual_subject
      .next(this._conjunto_menus_actual)
    this._menu_actual_subject.next(this._menu_actual)
    this._conjunto_links_sub_menus_disponibles_subject
      .next(this._conjunto_links_sub_menus_disponibles)
    this._conjunto_sub_menus_disponibles_subject
      .next(this._conjunto_sub_menus_disponibles)
  }

}
