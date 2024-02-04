import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioDinamicoComponent } from 'src/app/components/utiles/formularios/formulario-dinamico/formulario-dinamico.component';
import { CardComponent } from 'src/app/components/utiles/varios/card/card.component';
import { CampoBaseFormularioDinamico, CampoFormulario } from 'src/app/models/utiles/formularios/formulario-dinamico-campo-base.model';
import { AuthService } from 'src/app/services/inicio/signin/auth.service';

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

  constructor(
    private auth_service: AuthService,
    private router: Router,
  ) {}  

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

  valores_formulario!: any;
  guardar_valores_formulario(evento: any) {
    console.log(evento)
    this.valores_formulario = evento as any;
  }

  on_submit() {
    this.iniciar_sesion();
  }

  iniciar_sesion() {
    console.log('REGISTRANDO')
    this.auth_service.iniciar_sesion(this.valores_formulario)
      .subscribe((datos: any) => {
        console.log('DATOS:', datos)
        this.limpiar_formulario();
      });
  }

  // (o==================================================================o)
  //   CONTROL DIRECTO DEL FORMULARIO (INICIO)
  //   usando su componente
  // (o-----------------------------------------------------------\/-----o)
  
  @ViewChild('app_formulario_dinamico', { static: false }) 
  app_formulario_dinamico!: FormularioDinamicoComponent;
  
  limpiar_formulario() {
    this.app_formulario_dinamico.limpiar_todo();
  }

  // (o-----------------------------------------------------------/\-----o)
  //   CONTROL DIRECTO DEL FORMULARIO (FIN)
  // (o==================================================================o)


}
