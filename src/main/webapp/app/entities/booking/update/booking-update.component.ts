import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IBooking, Booking } from '../booking.model';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'jhi-booking-update',
  templateUrl: './booking-update.component.html',
})
export class BookingUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    eventDate: [null, [Validators.required]],
    venue: [null, [Validators.required]],
    plan: [null, [Validators.required]],
    createdDate: [null, [Validators.required]],
    contactNumber: [null, [Validators.required]],
    emailId: [null, [Validators.required]],
    userName: [],
    userId: [],
  });

  constructor(protected bookingService: BookingService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ booking }) => {
      if (booking.id === undefined) {
        const today = dayjs().startOf('day');
        booking.eventDate = today;
        booking.createdDate = today;
      }

      this.updateForm(booking);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const booking = this.createFromForm();
    if (booking.id !== undefined) {
      this.subscribeToSaveResponse(this.bookingService.update(booking));
    } else {
      this.subscribeToSaveResponse(this.bookingService.create(booking));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(booking: IBooking): void {
    this.editForm.patchValue({
      id: booking.id,
      eventDate: booking.eventDate ? booking.eventDate.format(DATE_TIME_FORMAT) : null,
      venue: booking.venue,
      plan: booking.plan,
      createdDate: booking.createdDate ? booking.createdDate.format(DATE_TIME_FORMAT) : null,
      contactNumber: booking.contactNumber,
      emailId: booking.emailId,
      userName: booking.userName,
      userId: booking.userId,
    });
  }

  protected createFromForm(): IBooking {
    return {
      ...new Booking(),
      id: this.editForm.get(['id'])!.value,
      eventDate: this.editForm.get(['eventDate'])!.value ? dayjs(this.editForm.get(['eventDate'])!.value, DATE_TIME_FORMAT) : undefined,
      venue: this.editForm.get(['venue'])!.value,
      plan: this.editForm.get(['plan'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? dayjs(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      contactNumber: this.editForm.get(['contactNumber'])!.value,
      emailId: this.editForm.get(['emailId'])!.value,
      userName: this.editForm.get(['userName'])!.value,
      userId: this.editForm.get(['userId'])!.value,
    };
  }
}
