import { Component, OnInit } from '@angular/core';
import { UsuarioRecibir } from 'src/app/models/usuario/usuario.model';
import { JsonAStringPipe } from 'src/app/pipes/utiles/json-a-string/json-a-string.pipe';
import { AdministracionUsuariosService } from 'src/app/services/admin/administracion-usuarios/administracion-usuarios.service';

@Component({
  selector: 'app-administracion-usuarios',
  standalone: true,
  imports: [
    JsonAStringPipe
  ],
  templateUrl: './administracion-usuarios.component.html',
  styleUrl: './administracion-usuarios.component.scss'
})
export class AdministracionUsuariosComponent implements OnInit {

  constructor(
    private usuario_service: AdministracionUsuariosService,
  ) {}

  // (o==================================================================o)
  //   #region CARGA INICIAL (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  ngOnInit(): void {
    this.usuario_service.obtener_usuarios()
    .subscribe((usuarios) => {
        this.usuarios = usuarios
      })
  }
  
  usuarios!: UsuarioRecibir[]

  
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion CARGA INICIAL (FIN)
  // (o==================================================================o)


}
