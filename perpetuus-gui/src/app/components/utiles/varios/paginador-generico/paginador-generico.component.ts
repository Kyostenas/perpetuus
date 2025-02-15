import { JsonPipe } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    Output,
    signal,
    Signal,
    WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Paginacion } from 'src/app/utiles/tipos-personalizados';

@Component({
    selector: 'app-paginador-generico',
    imports: [FormsModule, JsonPipe],
    templateUrl: './paginador-generico.component.html',
    styleUrl: './paginador-generico.component.scss',
})
export class PaginadorGenericoComponent {
    paginacion!: WritableSignal<Paginacion>
    @Input({ required: true, alias: 'paginacion' }) set _paginacion(
        valor_pag: Paginacion
    ) {
        if (this.paginacion) {
            this.paginacion.update((value) => {
                return { ...value, ...valor_pag };
            });
        } else {
            this.paginacion = signal(valor_pag)
        }
    }
    @Output() paginacion_modificada = new EventEmitter<Paginacion>();

    input_numero_pagina(event: Event) {
        const TARGET = event.target as HTMLInputElement
        const VALOR = Number(TARGET.value)
        this.paginacion.update(value => {
            return {
                ...value,
                pagina_actual: VALOR
            }
        })
        this.paginacion_modificada.emit(this.paginacion())
    }

    aumentar_uno_pagina() {
        this.paginacion.update(value => {
            return {
                ...value,
                pagina_actual: this.paginacion().pagina_actual + 1
            }
        })
        this.paginacion_modificada.emit(this.paginacion())
    }

    disminuir_uno_pagina() {
        this.paginacion.update(value => {
            return {
                ...value,
                pagina_actual: this.paginacion().pagina_actual - 1
            }
        })
        this.paginacion_modificada.emit(this.paginacion())
    }
}
