import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBooking } from '../booking.model';
import { BookingService } from '../service/booking.service';

@Component({
  templateUrl: './booking-delete-dialog.component.html',
})
export class BookingDeleteDialogComponent {
  booking?: IBooking;

  constructor(protected bookingService: BookingService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bookingService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
