import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormularioDinamicoComponent } from 'src/app/components/utiles/formularios/formulario-dinamico/formulario-dinamico.component';
import { CardComponent } from 'src/app/components/utiles/varios/card/card.component';
import { CampoBaseFormularioDinamico, CampoFormulario } from 'src/app/models/utiles/formularios/formulario-dinamico-campo-base.model';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormularioDinamicoComponent,
    CardComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  datos_formulario: CampoBaseFormularioDinamico<string>[] = [
    new CampoFormulario({
      llave: 'nombre_usuario',
      etiqueta: 'Usuario',
      tipo: 'text',
      clase_columna: 'col-12'
    }),
    new CampoFormulario({
      llave: 'contrasena',
      etiqueta: 'Contraseña',
      tipo: 'password'
    }),
  ]

  get datos_formulario_json_string(): string {
    return JSON.stringify(this.datos_formulario, undefined, 2);
  }

}
