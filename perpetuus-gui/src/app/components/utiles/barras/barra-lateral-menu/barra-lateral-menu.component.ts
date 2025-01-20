import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BootstrapHideAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-hide-auto/bootstrap-hide-auto.directive';
import { BootstrapShowAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-show-auto/bootstrap-show-auto.directive';
import { DESCRIPCION_MENU } from 'src/app/models/usuario/usuario.model';
import { FragmentCallbackService } from 'src/app/services/utiles/estructurales/fragment-callback/fragment-callback.service';
import { UtilidadesService } from 'src/app/services/utiles/varios/utilidades/utilidades.service';

@Component({
    selector: 'app-barra-lateral-menu',
    imports: [
        CommonModule,
        BootstrapShowAutoDirective,
        BootstrapHideAutoDirective,
        RouterModule,
    ],
    templateUrl: './barra-lateral-menu.component.html',
    styleUrl: './barra-lateral-menu.component.scss'
})
export class BarraLateralMenuComponent implements OnInit {

  constructor(
    private utiles: UtilidadesService,
    private fragmentos: FragmentCallbackService,
  ) {}

  completo: boolean = true

  toggle_menu_lateral() {
    this.completo = !!!this.completo
    this.utiles.guardar_local_storage('menu_abierto', this.completo)
  }

  ngOnInit(): void {
    this.lista_menu = 
      this.utiles.consultar_local_storage('menus')
    this.completo =
      this.utiles.consultar_local_storage('menu_abierto')
  }

  agregar_framento(fragmento: string) {
    this.fragmentos.agregar_fragmento(fragmento)
  }

  lista_menu!: DESCRIPCION_MENU[]
  
}
