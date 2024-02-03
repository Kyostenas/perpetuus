import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import ObjectID from 'bson-objectid';

import { CampoBaseFormularioDinamico, TipoCampoBase } from 'src/app/models/utiles/formularios/formulario-dinamico-campo-base.model';

@Component({
  selector: 'app-formulario-dinamico-campo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './formulario-dinamico-campo.component.html',
  styleUrl: './formulario-dinamico-campo.component.scss'
})
export class FormularioDinamicoCampoComponent implements OnInit {

  ngOnInit(): void {
    this._id_campo = new ObjectID().toHexString();
  }

  private _id_campo!: string;

  /**
   * La descripcion del campo (usando `CampoBase`)
   */
  @Input() campo!: CampoBaseFormularioDinamico<string>;

  /**
   * En este campo se debe pasar el `FormGroup`
   * que va a contener este mismo. Es para
   * que el campo pueda tener referencia a el.
   */
  @Input() formulario_contenedor!: FormGroup;

  get es_valido(): boolean {
    return this.formulario_contenedor
      .controls[this.campo.llave]
      .valid;
  }

  get tipo_campo(): TipoCampoBase | 'CHECK' {
    let tipo = this.campo.tipo;
    if (['checkbox', 'radio'].includes(tipo)) {
      return 'CHECK';
    } 
    else return tipo;
  }

  get clase_campo(): string {
    return this.campo.clase_bootstrap;
  }

  get llave_campo(): string {
    return this.campo.llave;
  }

  get es_dropdown(): boolean {
    return this.campo.tipo === 'BS_DROPDOWN';
  }

  get es_listgroup(): boolean {
    return this.campo.tipo === 'BS_LISTGROUP';
  }

  get id_campo(): string {
    return this._id_campo;
  }

  get etiqueta_campo(): string {
    return this.campo.etiqueta;
  }

  get class_columna(): string {
    return this.campo.clase_columna
  }

}
