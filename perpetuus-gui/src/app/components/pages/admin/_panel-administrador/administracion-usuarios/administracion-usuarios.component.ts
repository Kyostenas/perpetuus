import { CommonModule, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OPCIONES_TABLA_GENERICA, TablaGenericaComponent } from 'src/app/components/utiles/varios/tabla-generica/tabla-generica.component';
import { UsuarioRecibir } from 'src/app/models/usuario/usuario.model';
import { JsonAStringPipe } from 'src/app/pipes/utiles/json-a-string/json-a-string.pipe';
import { AdministracionUsuariosService } from 'src/app/services/admin/administracion-usuarios/administracion-usuarios.service';

@Component({
    selector: 'app-administracion-usuarios',
    imports: [
        // JsonAStringPipe,
        TablaGenericaComponent,
        CommonModule,
    ],
    templateUrl: './administracion-usuarios.component.html',
    styleUrl: './administracion-usuarios.component.scss'
})
export class AdministracionUsuariosComponent implements OnInit {

  constructor(
    private usuario_service: AdministracionUsuariosService,
  ) {}

  // (o==================================================================o)
  //   #region CARGA INICIAL (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  ngOnInit(): void {
    this.usuario_service.obtener_usuarios()
    .subscribe((usuarios) => {
        this.usuarios = usuarios
        this.crear_datos_tabla()
      })
  }
  
  usuarios!: UsuarioRecibir[]
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion CARGA INICIAL (FIN)
  // (o==================================================================o)

  // (o==================================================================o)
  //   #region TABLA GENERICA (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  datos_tabla_generica!: OPCIONES_TABLA_GENERICA
  
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
            campo: 'nombre_usuario'
          },
          tooltip_encabezado: {
            contenido: 'El identificador del usuario dentro del sistema',
          },
        },
        {
          titulo: 'CORREO',
          contenido: {
            campo: 'correo'
          },
          tooltip_encabezado: {
            contenido: 'Un correo electrónico válido proveído por el usuario',
          },
        },
        {
          titulo: 'NÚMERO CELULAR',
          contenido: {
            campo: 'numero_celular'
          },
          tooltip_encabezado: {
            contenido: 'Un número de celular válido proveído por el usuario',
          },
        },
      ],
      documentos: this.usuarios,
      mostrar_indice_fila: true,
      mostrar_ordenadores: true,
    }
  }

  cambiar_ordenamiento(ordenadores: any) {
    console.log(ordenadores)
  }
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion TABLA GENERICA (FIN)
  // (o==================================================================o)

}
