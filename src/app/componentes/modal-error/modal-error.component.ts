import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent {
  @Input() errorLogin : string;
  @Output() pasarCerrarModal = new EventEmitter<string>();

  cerrarModal(){
    this.pasarCerrarModal.emit('');
  }
}
