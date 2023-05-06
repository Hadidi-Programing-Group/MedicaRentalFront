import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent
{
  @Input() deleteContent: string = '';
  @Input() successMessage: string = '';
  @Input() failureMessage: string = '';
  @Input() type: string = '';
  @Input() submitted = false
  @Input() success = false

  @Output() cancelDeleteEvent = new EventEmitter()
  @Output() confirmDeleteEvent = new EventEmitter()

  cancelDelete()
  {
    this.cancelDeleteEvent.emit()
  }

  confirmedDeleteMessage()
  {
    this.confirmDeleteEvent.emit()
  }
}
