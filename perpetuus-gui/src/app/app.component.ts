import { APP_BASE_HREF, CommonModule } from '@angular/common';
import {
    Component,
    HostListener,
    LOCALE_ID,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from './services/inicio/signin/auth.service';
import { ControlNotificacionesComponent } from './components/utiles/varios/control-notificaciones/control-notificaciones.component';
import { ModalNormalComponent } from './components/utiles/flotantes/modal/modal-normal/modal-normal.component';
import { FragmentCallbackService } from './services/utiles/estructurales/fragment-callback/fragment-callback.service';
import { Subscription } from 'rxjs';
import { ControlBreadcrumbsService } from './services/utiles/estructurales/control-breadcrumbs/control-breadcrumbs.service';
import { DeteccionViewportService } from './services/utiles/estructurales/deteccion-viewport/deteccion-viewport.service';
import { UtilidadesService } from './services/utiles/varios/utilidades/utilidades.service';

const rutas_exentas = ['/', '/inicio', '/inicio/signin'];

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterModule,
        ControlNotificacionesComponent,
        ModalNormalComponent,
    ],
    providers: [
        // Configuraciones de idioma.
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LOCALE_ID, useValue: 'es-MX' },
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private auth_service: AuthService,
        private fragment_service: FragmentCallbackService,
        private control_breadcrumbs: ControlBreadcrumbsService,
        private viewport: DeteccionViewportService,
        private renderer2: Renderer2,
        private utiles: UtilidadesService,
    ) {}

    title = 'perpetuus-gui';

    ngOnInit(): void {
        this.preparar_escucha_de_fragmentos();
        this.control_breadcrumbs.subscribirse_a_los_cambios_de_url();
        this.viewport.calcular_ancho_viewport();
    }

    ngOnDestroy(): void {
        try {
            this.subscripcion_fragmentos.unsubscribe();
        } catch (error) {
            console.debug(
                'No se pudo eliminar la subscripción a los fragmentos: ' + error
            );
        }
        try {
            this.control_breadcrumbs.desuscribirse_cambios_url();
        } catch (error) {
            console.debug(
                'No se pudo eliminar la subscripción a la url (breadcrumbs): ' +
                    error
            );
        }
    }

    // (o==================================================================o)
    //   #region CONTROL DE FRAGMENTOS (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    subscripcion_fragmentos!: Subscription;

    preparar_escucha_de_fragmentos() {
        this.fragment_service.registrar_callback(
            'perfil-usuario',
            () => {
                this.perfil_usuario.mostrar_modal();
            },
            () => {
                this.perfil_usuario.ocultar_modal();
            }
        );
        this.fragment_service.registrar_callback(
            'notificaciones-usuario',
            () => {
                this.notificaciones_usuario.mostrar_modal();
            },
            () => {
                this.notificaciones_usuario.ocultar_modal();
            }
        );
        this.fragment_service.registrar_callback(
            'busqueda-global',
            () => {
                this.busqueda_global.mostrar_modal();
            },
            () => {
                this.busqueda_global.ocultar_modal();
            }
        );
        this.subscripcion_fragmentos = this.route.fragment.subscribe(
            (fragmento) => {
                if (fragmento) {
                    this.fragment_service.ejecutar_callback_aparicion(
                        fragmento
                    );
                } else {
                    this.fragment_service.ejecutar_callback_eliminado();
                }
            }
        );
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion CONTROL DE FRAGMENTOS (FIN)
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region MODALES USUARIO (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    // mostrando_perfil_usuario: boolean = false
    // mostrando_notficaciones_usuario: boolean = false

    @ViewChild('perfil_usuario', { static: false })
    perfil_usuario!: ModalNormalComponent;
    @ViewChild('notificaciones_usuario', { static: false })
    notificaciones_usuario!: ModalNormalComponent;
    @ViewChild('busqueda_global', { static: false })
    busqueda_global!: ModalNormalComponent;

    cerrar_perfil_usuario() {
        this.perfil_usuario.ocultar_modal();
        this.fragment_service.limpiar_fragmento();
    }

    cerrar_notificaciones_usuario() {
        this.notificaciones_usuario.ocultar_modal();
        this.fragment_service.limpiar_fragmento();
    }

    cerrar_busqueda_global() {
        this.busqueda_global.ocultar_modal();
        this.fragment_service.limpiar_fragmento();
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion MODALES USUARIO (FIN)
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region DETECCION DE VIEWPORT (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    @HostListener('window:resize')
    acciones_de_deteccion_de_viewport() {
        this.viewport.calcular_ancho_viewport();
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion DETECCION DE VIEWPORT (FIN)
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region CONTROL TECLAS (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    @HostListener('window:keydown.shift.k')
    abrir_buscador_teclado() {
        this.fragment_service.agregar_fragmento('busqueda-global');
    }

    @HostListener('window:keydown.shift.u')
    abrir_perfil_usuario_teclado() {
        this.fragment_service.agregar_fragmento('perfil-usuario');
    }

    @HostListener('window:keydown.shift.n')
    abrir_notificaciones_usuario_teclado() {
        this.fragment_service.agregar_fragmento('notificaciones-usuario');
    }

    @HostListener('window:keydown', ['$event'])
    on_key_down(event: KeyboardEvent) {
        switch (event?.key) {
            case 'ArrowRight':
                this.utiles.focus_siguiente_tab(
                    event,
                )
                break;
            case 'ArrowDown':
                this.utiles.focus_siguiente_tab(
                    event,
                )
                break;
            case 'ArrowLeft':
                this.utiles.focus_anterior_tab(
                    event,
                )
                break;
            case 'ArrowUp':
                this.utiles.focus_anterior_tab(
                    event,
                )
                break;
        }
    }
     


    // (o-----------------------------------------------------------/\-----o)
    //   #endregion CONTROL TECLAS (FIN)
    // (o==================================================================o)
}
