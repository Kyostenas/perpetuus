import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() mostrar_encabezado: boolean = false;
  @Input() mostrar_cuerpo: boolean = true;
  @Input() mostrar_pie: boolean = false;

}
