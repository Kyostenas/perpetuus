import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormularioDinamicoCampoComponent } from '../formulario-dinamico-campo/formulario-dinamico-campo.component';
import { FormularioDinamicoService } from 'src/app/services/utiles/formularios/formulario-dinamico/formulario-dinamico.service';
import { CampoBaseFormularioDinamico } from 'src/app/models/utiles/formularios/formulario-dinamico-campo-base.model';

@Component({
  selector: 'app-formulario-dinamico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormularioDinamicoCampoComponent,
  ],
  providers: [
    FormularioDinamicoService
  ],
  templateUrl: './formulario-dinamico.component.html',
  styleUrl: './formulario-dinamico.component.scss'
})
export class FormularioDinamicoComponent implements OnInit{
  
  @Input() campos: CampoBaseFormularioDinamico<string>[] | null = [];
  @Input() validar: boolean = true;

  constructor(
    private formulario_dinamico_service: FormularioDinamicoService,
  ) {}

  ngOnInit(): void {
    this.acciones_de_inicio();
  }

  acciones_de_inicio() {
    this.crear_formulario();
  }

  crear_formulario() {
    this.formulario = this.formulario_dinamico_service.crear_formulario(
      this.campos as CampoBaseFormularioDinamico<string>[]
    )
  }

  class_columna(indice: number) {
    return this.campos?.at(indice)?.clase_columna;
  }

  formulario!: FormGroup;



}
