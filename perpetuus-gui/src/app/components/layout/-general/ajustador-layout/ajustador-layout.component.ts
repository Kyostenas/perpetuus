import { CommonModule } from '@angular/common';
import { Component, HostListener, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BootstrapHideAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-hide-auto/bootstrap-hide-auto.directive';
import { BootstrapShowAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-show-auto/bootstrap-show-auto.directive';
import { AuthService } from 'src/app/services/inicio/signin/auth.service';
import { DeteccionViewportService } from 'src/app/services/utiles/estructurales/deteccion-viewport/deteccion-viewport.service';

@Component({
    selector: 'app-ajustador-layout',
    imports: [CommonModule],
    templateUrl: './ajustador-layout.component.html',
    styleUrl: './ajustador-layout.component.scss',
})
export class AjustadorLayoutComponent {
    constructor(
        private viewport: DeteccionViewportService,
        private auth_service: AuthService
    ) {
        this.valid_session = toSignal(this.auth_service.validar_sesion());
    }

    clases_display_sticky_barra_arriba = `
    d-none 
    d-sm-none 
    d-md-none 
    d-lg-block 
    d-xl-block 
    d-xxl-block
  `;
    clases_display_sticky_barra_abajo = `
    d-block 
    d-sm-block 
    d-m
    d-block 
    d-lg-none 
    d-xl-none 
    d-xxl-none
    sticky-bottom
    mt-5
  `;
    modo_viewport: WritableSignal<'movil' | 'escritorio'> =
        this.viewport.modo_viewport;
    valid_session!: Signal<boolean | undefined>;

    // (o==================================================================o)
    //   #region BOTON SCROLL UP (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    mostrar_boton_top: boolean = false;
    elemento_scroll!: HTMLElement;
    scroll_ventana(event: Event) {
        if (!this.elemento_scroll)
            this.elemento_scroll = event.target as HTMLElement;
        if (this.elemento_scroll.scrollTop > 100) {
            this.mostrar_boton_top = true;
        } else {
            this.mostrar_boton_top = false;
        }
    }

    scroll_hasta_arriba() {
        this.elemento_scroll.scrollTo({ top: 0, behavior: 'instant' });
        window.scrollTo({ top: 0 });
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion BOTON SCROLL UP (FIN)
    // (o==================================================================o)
}
