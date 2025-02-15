import { computed, effect, Injectable, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginacion } from 'src/app/utiles/tipos-personalizados';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ControlQueriesUrlService {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.query_string = toSignal(this.route.queryParams, {initialValue: {}}) as Signal<QUERY_PARAMS_GENERAL | undefined>
    effect(() => {
      // console.log(this.query_string())
      this.query_actual = computed(() => {
        try {
          let objeto_final: {[type: string]: any} = {}
          for (let [nombre, valor_string] of Object.entries(
            this.query_string() as QUERY_PARAMS_GENERAL
          )) {
            objeto_final[nombre] = JSON.parse(valor_string)
          }
          return objeto_final as QUERY_PARAMS_GENERAL
        } catch {
          return {} as QUERY_PARAMS_GENERAL;
        }
      })
    })
  }

  private query_string!: Signal<QUERY_PARAMS_GENERAL | undefined>
  query_actual!: Signal<QUERY_PARAMS_GENERAL> 

  queries = {
    paginacion: this.preparar_query<Paginacion>('paginacion'),
    busqueda_global: this.preparar_query<{valor: string}>('busqueda_global'),
    busqueda_por_termino: this.preparar_query<{valor: string}>('busqueda_por_termino'),
    filtros: <T>() => this.preparar_query<T>('filtros'),
  }

  private accion<T>(nombre: string) {
    return {
      ocultar: () => this.ocultar(nombre),
      definir: (objeto: T) => this.definir<T>(nombre, objeto),
    }
  }

  private preparar_query<T>(nombre: string) {
    return {
      accion: this.accion<T>(nombre),
    }
  }

  private ocultar(nombre: string) {
    const PARAMS_ACTUALES = { ...this.route.snapshot.queryParams }
    delete PARAMS_ACTUALES[nombre]
    this.router.navigate([], {
      queryParams: PARAMS_ACTUALES,
      queryParamsHandling: 'merge'
    })
  }

  private definir<T>(nombre: string, objeto: T) {
    this.router.navigate([], {
      queryParams: { [nombre]: JSON.stringify(objeto) },
      queryParamsHandling: 'merge'
    })
  }

  limpiar_todo() {
    this.router.navigate([], { 
      queryParams: {}, 
      queryParamsHandling: 'merge'
    })
  }
  
}

export interface QUERY_PARAMS_GENERAL {
  paginacion: Paginacion,
  filtros: any
}


// export interface query_paginacion extends Paginacion {}
