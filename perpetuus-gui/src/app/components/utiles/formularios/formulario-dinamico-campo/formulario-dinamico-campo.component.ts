import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ObjectID from 'bson-objectid';

import { CampoBaseFormularioDinamico, TipoCampoBase } from 'src/app/models/utiles/formularios/formulario-dinamico-campo-base.model';
import { ValidacionFormularioService } from 'src/app/services/utiles/formularios/validacion-formulario/validacion-formulario.service';
import { ElementoDesplegableComponent } from '../../varios/elemento-desplegable/elemento-desplegable.component';
import { ElementoOcultableDirective } from 'src/app/directives/utiles/varios/elemento-ocultable/elemento-ocultable.directive';
import { MensajesErrorValidacionFormulariosComponent } from '../mensajes-error-validacion-formularios/mensajes-error-validacion-formularios.component';

@Component({
    selector: 'app-formulario-dinamico-campo',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ElementoDesplegableComponent,
        ElementoOcultableDirective,
        MensajesErrorValidacionFormulariosComponent,
    ],
    templateUrl: './formulario-dinamico-campo.component.html',
    styleUrl: './formulario-dinamico-campo.component.scss'
})
export class FormularioDinamicoCampoComponent implements OnInit {

    constructor(
        private servicio_validacion: ValidacionFormularioService
    ) { }

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

    /**
     * Por defecto `true`.
     * 
     * Indica si se revisará la validéz del campo
     */
    @Input() validar: boolean = true;

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
        let clases_agregar = [
            this.campo.clase_bootstrap,
            this.clase_campo_invalido,
            this.clase_campo_valido
        ];
        return clases_agregar.join(' ');
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

    get placeholder_campo(): string {
        let asterisco = '';
        if (this.campo_es_obligatorio) asterisco = '*'
        return this.campo.etiqueta.concat(asterisco);
    }

    get campo_es_obligatorio(): boolean {
        return this.campo.validaciones_campo.includes(
            Validators.required
        )
    }

    get class_columna(): string {
        return this.campo.clase_columna;
    }

    get campo_de_formulario(): AbstractControl<any, any> {
        return this.formulario_contenedor
            .controls[this.llave_campo];
    }

    get campo_invalido(): boolean {
        if (!this.validar) return false;
        let invalido = this.servicio_validacion.invalid(
            this.campo_de_formulario
        );
        if (invalido) this.marcar_feedback_mostrado();
        return invalido;
    }

    get campo_valido(): boolean {
        if (!this.validar) return false;
        let valido = this.servicio_validacion.valid(
            this.campo_de_formulario
        );
        return valido;
    }

    // get clase_mostrar_feedback_invalido(): string {
    //   let usar_clase_mostrar = !this.feedback_completamente_oculto
    //   return usar_clase_mostrar? 'mostrar' : '';
    // }

    get clase_campo_invalido(): string {
        return this.campo_invalido ? 'is-invalid' : '';
    }

    get clase_campo_valido(): string {
        return this.campo_valido ? 'is-valid' : '';
    }

    feedback_completamente_oculto: boolean = true
    marcar_feedback_oculto() {
        this.feedback_completamente_oculto = true
    }

    marcar_feedback_mostrado() {
        this.feedback_completamente_oculto = false
    }

    evaluar_higiene() {
        if (!this.campo_de_formulario.touched) {
            this.marcar_campo_tocado()
        }
    }

    marcar_campo_tocado() {
        this.campo_de_formulario
            .markAsTouched({ onlySelf: true })
    }

    marcar_campo_como_limpio() {
        this.campo_de_formulario
            .markAsPristine({ onlySelf: true })
    }

}
