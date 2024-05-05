import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-elemento-desplegable',
  standalone: true,
  imports: [
    NgbCollapseModule
  ],
  templateUrl: './elemento-desplegable.component.html',
  styleUrl: './elemento-desplegable.component.scss'
})
export class ElementoDesplegableComponent {

  /**
   * Si es `true`, se va a expandir.
   * Si es `false`, se va a colapsar.
   */
  @Input('expandir') expandido: boolean = false;
  /**
   * Para cuando termina de ocultarse 
   * (despues de animacion).
   */
  @Output('ocultado') ocultado: EventEmitter<null> = new EventEmitter();
  /**
   * Para cuando termina de revelarse 
   * (despues de animacion).
   */
  @Output('mostrado') mostrado: EventEmitter<null> = new EventEmitter();
  /**
   * Para cuando cambia el estado del
   * desplegable.
   */
  @Output('cambio') cambio: EventEmitter<null> = new EventEmitter();

  // @Input('horizontal') horizonal: boolean = false;

  emitir_ocultado() {
    this.ocultado.emit();
  }

  emitir_mostrado() {
    this.mostrado.emit();
  }

  emitir_cambio() {
    this.cambio.emit();
  }





}
