import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormularioDinamicoComponent } from 'src/app/components/utiles/formularios/formulario-dinamico/formulario-dinamico.component';
import { CardComponent } from 'src/app/components/utiles/varios/card/card.component';
import { CampoBaseFormularioDinamico, CampoFormulario } from 'src/app/models/utiles/formularios/formulario-dinamico-campo-base.model';
import { REGEX_VALIDACION_CORREO } from 'src/app/services/utiles/varios/utilidades/utilidades.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormularioDinamicoComponent,
    CardComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  datos_formulario: CampoBaseFormularioDinamico<string>[] = [
    new CampoFormulario({
      llave: 'nombres',
      etiqueta: 'Nombres',
      tipo: 'text',
      clase_columna: 'col-12',
      validaciones_campo: [
        Validators.required,
        Validators.minLength(3),
      ]
    }),
    new CampoFormulario({
      llave: 'apellidos',
      etiqueta: 'Apellidos',
      tipo: 'text',
      clase_columna: 'col-12',
      validaciones_campo: [
        Validators.required,
        Validators.minLength(3),
      ]
    }),
    new CampoFormulario({
      llave: 'nombre_usuario',
      etiqueta: 'Usuario',
      tipo: 'text',
      clase_columna: 'col-12',
      validaciones_campo: [
        Validators.required,
        Validators.minLength(3),
      ]
    }),
    new CampoFormulario({
      llave: 'correo',
      etiqueta: 'Correo',
      tipo: 'email',
      validaciones_campo: [
        Validators.pattern(REGEX_VALIDACION_CORREO)
      ]
    }),
    new CampoFormulario({
      llave: 'contrasena',
      etiqueta: 'Contraseña (de 5 a 25 caracteres)',
      tipo: 'password',
      validaciones_campo: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]
    }),
    new CampoFormulario({
      llave: 'numero_celular',
      etiqueta: 'Número Celular',
      tipo: 'tel',
      validaciones_campo: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]
    }),

  ]

}
