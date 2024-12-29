import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FragmentCallbackService {

  constructor(
    private router: Router
  ) { }

  private callbacks: { [key: string]: {
    aparicion_fragmento: () => void,
    eliminado_fragmento: () => void,
  } } = {};

  registrar_callback(
    fragmento: string, 
    callback_aparicion_fragmento: () => void,
    callback_eliminado_fragmento: () => void,
  ): void {
    this.callbacks[fragmento] = {
      aparicion_fragmento:
        callback_aparicion_fragmento,
      eliminado_fragmento:
        callback_eliminado_fragmento,
    }
  }

  private fragmento_actual!: string
  ejecutar_callback_aparicion(fragmento: string): void {
    this.fragmento_actual = fragmento
    if (!!this.callbacks[fragmento]) {
      this.callbacks[fragmento]['aparicion_fragmento']()
    }
  }

  ejecutar_callback_eliminado(): void {
    if (!!this.callbacks[this.fragmento_actual]) {
      this.callbacks[this.fragmento_actual]['eliminado_fragmento']()
    }
  }

  limpiar_fragmento(): void {
    this.router.navigate([], {
      queryParamsHandling: 'preserve',
      fragment: undefined,
    })
    this.ejecutar_callback_eliminado()
  }

  agregar_fragmento(fragmento: string) {
    this.router.navigate([], {
      queryParamsHandling: 'preserve',
      fragment: undefined,
    }).then(() => {
      this.router.navigate([], {
        queryParamsHandling: 'preserve',
        fragment: fragmento
      })
    })
  }
}
