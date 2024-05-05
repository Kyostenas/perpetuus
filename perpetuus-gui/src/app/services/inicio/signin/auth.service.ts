import { Injectable } from '@angular/core';
import { UtilidadesService } from '../../utiles/varios/utilidades/utilidades.service';
import { UsuarioEnviar, UsuarioRecibir } from 'src/app/models/usuario/usuario.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private utilidades: UtilidadesService,
    private http: HttpClient
  ) { }

  private ruta_base = 'auth';
  private opciones = {withCredentials: true};
  

  private obtener_url(ruta: string[]) {
    const url = this.utilidades
      .preparar_url_conexion_api(
        [this.ruta_base, ...ruta]
      );
    return url;
  }

  registrarse(usuario: UsuarioEnviar) {
    const url = this.obtener_url(['signup']);
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        alert(resp.mensaje);
      }),
      catchError(err => {
        alert('¡Error al registrarse! ' + err.error.mensaje);
        return throwError(() => new Error(err))
      })
    );
  }

  iniciar_sesion(datos: any) {
    const url = this.obtener_url(['signin']);
    return this.http.post(url, datos, this.opciones).pipe(
      map((resp: any) => {
        alert(resp.mensaje);
        return resp.datos as UsuarioRecibir
      }),
      catchError(err => {
        alert('¡Error al iniciar sesión! ' + err.error.mensaje);
        return throwError(() => new Error(err))
      })
    );
  }

  cerrar_sesion() {
    const url = this.obtener_url(['signout']);
    return this.http.post(url, {}, this.opciones).pipe(
      map((resp: any) => {
        alert(resp.mensaje);
      }),
      catchError(err => {
        alert('¡Error al cerrar sesión! ' + err.error.mensaje);
        return throwError(() => new Error(err));
      })
    );
  }

  refrescar_token(refrsh_tkn: string) {
    const url = this.obtener_url(['refresh-session', refrsh_tkn]);
    return this.http.post(url, {}, this.opciones).pipe(
      map((resp: any) => {
        alert(resp.mensaje);
      }),
      catchError(err => {
        alert('¡Error refrescar la sesión! ' + err.error.mensaje);
        return throwError(() => new Error(err));
      })
    );
  }

  /**
   * Comprueba que la sesión exista, es decir, que no se
   * halla cerrado desde el API.
   * 
   * @returns {Boolean} Booleano que dicta si hay una sesión
   */
  validar_sesion() {
    const url = this.obtener_url(['validate-session']);
    return this.http.get(url, this.opciones).pipe(
      map((resp: any) => {
        alert(resp.mensaje);
        return resp.datos as Boolean
      }),
      catchError(err => {
        alert('¡Error validar la sesión! ' + err.error.mensaje);
        return throwError(() => new Error(err));
      })
    );
  }



}
