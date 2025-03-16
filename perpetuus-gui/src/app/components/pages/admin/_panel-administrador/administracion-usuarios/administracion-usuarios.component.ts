import { CommonModule, UpperCasePipe } from '@angular/common';
import {
    Component,
    effect,
    OnInit,
    signal,
    Signal,
    WritableSignal,
} from '@angular/core';
import {
    OPCIONES_FILA_TABLA_GENERICA,
    OPCIONES_TABLA_GENERICA,
    TablaGenericaComponent,
} from 'src/app/components/utiles/varios/tabla-generica/tabla-generica.component';
import { UsuarioRecibir } from 'src/app/models/usuario/usuario.model';
import { AdministracionUsuariosService } from 'src/app/services/admin/administracion-usuarios/administracion-usuarios.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Paginacion } from 'src/app/utiles/tipos-personalizados';

@Component({
    selector: 'app-administracion-usuarios',
    imports: [
        // JsonAStringPipe,
        TablaGenericaComponent,
        CommonModule,
    ],
    templateUrl: './administracion-usuarios.component.html',
    styleUrl: './administracion-usuarios.component.scss',
})
export class AdministracionUsuariosComponent implements OnInit {
    constructor(private usuario_service: AdministracionUsuariosService) {
        // this.usuarios =
        effect(() => {
            // this.paginacion()
            // console.log('PUES ASI NO')
            // this.usuarios = toSignal(
            //     this.usuario_service.obtener_usuarios(this.paginacion())
            // );
        });
        // effect(() => {
        //   this.usuarios()
        // })
    }

    // (o==================================================================o)
    //   #region CARGA INICIAL (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    ngOnInit(): void {
        this.crear_datos_tabla();
    }

    usuarios: Signal<UsuarioRecibir[] | undefined> = toSignal(
        this.usuario_service.obtener_usuarios()
    );

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion CARGA INICIAL (FIN)
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region TABLA GENERICA (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    datos_tabla_generica!: OPCIONES_TABLA_GENERICA;
    paginacion!: WritableSignal<Paginacion>;

    crear_datos_tabla() {
        this.datos_tabla_generica = {
            columnas: [
                {
                    titulo: 'NOMBRE',
                    contenido: {
                        campo: 'nombre_completo',
                    },
                    tooltip_encabezado: {
                        contenido: 'El nombre real del usuario',
                        pipe: UpperCasePipe,
                    },
                },
                {
                    titulo: 'USUARIO',
                    contenido: {
                        campo: 'nombre_usuario',
                    },
                    tooltip_encabezado: {
                        contenido:
                            'El identificador del usuario dentro del sistema',
                    },
                },
                {
                    titulo: 'CORREO',
                    contenido: {
                        campo: 'correo',
                    },
                    tooltip_encabezado: {
                        contenido:
                            'Un correo electrónico válido proveído por el usuario',
                    },
                },
                {
                    titulo: 'NÚMERO CELULAR',
                    contenido: {
                        campo: 'numero_celular',
                    },
                    tooltip_encabezado: {
                        contenido:
                            'Un número de celular válido proveído por el usuario',
                    },
                },
            ],
            mostrar_indice_fila: true,
            // mostrar_paginador: false,
            // mostrar_boton_layout: false,
            // mostrar_buscador: false,
            // mostrar_ordenadores: false,
        };
    }

    cambiar_ordenamiento(paginacion: Paginacion) {
        try {
            this.paginacion.update((value) => paginacion);
        } catch (err) {
            console.log(err)
            this.paginacion = signal(paginacion)
        }
        // this.usuarios = toSignal(
        //     this.usuario_service.obtener_usuarios(paginacion)
        // );
    }

    accion_click_fila(datos: OPCIONES_FILA_TABLA_GENERICA) {
        // console.log(datos)
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion TABLA GENERICA (FIN)
    // (o==================================================================o)
}
