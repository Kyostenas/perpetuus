import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-elemento-desplegable',
    imports: [
        NgbCollapseModule,
        CommonModule,
    ],
    templateUrl: './elemento-desplegable.component.html',
    styleUrl: './elemento-desplegable.component.scss'
})
export class ElementoDesplegableComponent {

  /**
   * Si es `true`, se va a expandir.
   * Si es `false`, se va a colapsar.
   */
  @Input({required: true, alias: 'expandir'}) expandido: boolean = false;
  @Input('horizontal') horizonal: boolean = false;
  @Input('animated') animated: boolean = false;

  /**
   * Para cuando termina de ocultarse 
   * (despues de animacion).
   */
  @Output('hidden') hidden: EventEmitter<null> = new EventEmitter();
  /**
   * Para cuando termina de revelarse 
   * (despues de animacion).
   */
  @Output('shown') shown: EventEmitter<null> = new EventEmitter();
  /**
   * Para cuando cambia el estado del
   * desplegable.
   */
  @Output('changed') changed: EventEmitter<null> = new EventEmitter();


  emmit_hidden() {
    this.hidden.emit();
  }

  emmit_shown() {
    this.shown.emit();
  }

  emmit_changed() {
    this.changed.emit();
  }





}
