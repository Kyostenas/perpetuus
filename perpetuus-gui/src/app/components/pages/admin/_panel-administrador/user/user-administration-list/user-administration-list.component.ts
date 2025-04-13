import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, effect, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TablaGenericaComponent, OPCIONES_TABLA_GENERICA, OPCIONES_FILA_TABLA_GENERICA } from 'src/app/components/utiles/varios/tabla-generica/tabla-generica.component';
import { UsuarioRecibir } from 'src/app/models/usuario/usuario.model';
import { AdministracionUsuariosService } from 'src/app/services/admin/administracion-usuarios/administracion-usuarios.service';
import { Paginacion } from 'src/app/utiles/tipos-personalizados';

@Component({
    selector: 'app-user-administration-list',
    imports: [TablaGenericaComponent, CommonModule],
    templateUrl: './user-administration-list.component.html',
    styleUrl: './user-administration-list.component.scss',
})
export class UserAdministrationListComponent {
    // (o==================================================================o)
    //   #region INIT
    // (o-----------------------------------------------------------\/-----o)

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

    ngOnInit(): void {
        this.crear_datos_tabla();
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion INIT
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region VARIABLES
    // (o-----------------------------------------------------------\/-----o)

    usuarios: Signal<UsuarioRecibir[] | undefined> = toSignal(
        this.usuario_service.obtener_usuarios()
    );
    datos_tabla_generica!: OPCIONES_TABLA_GENERICA<UsuarioRecibir>;
    paginacion!: WritableSignal<Paginacion>;

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion VARIABLES
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region GENERIC TABLE
    // (o-----------------------------------------------------------\/-----o)

    crear_datos_tabla() {
        this.datos_tabla_generica = {
            columnas: [
                {
                    titulo: 'NOMBRE',
                    contenido: {
                        campo: 'rol.super_admin',
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
            console.log(err);
            this.paginacion = signal(paginacion);
        }
        this.usuarios = toSignal(
            this.usuario_service.obtener_usuarios(paginacion)
        );
    }

    accion_click_fila(datos: OPCIONES_FILA_TABLA_GENERICA) {
        // console.log(datos)
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion GENERIC TABLE
    // (o==================================================================o)
}
