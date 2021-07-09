jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { BookingService } from '../service/booking.service';
import { IBooking, Booking } from '../booking.model';

import { BookingUpdateComponent } from './booking-update.component';

describe('Component Tests', () => {
  describe('Booking Management Update Component', () => {
    let comp: BookingUpdateComponent;
    let fixture: ComponentFixture<BookingUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let bookingService: BookingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BookingUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(BookingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BookingUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      bookingService = TestBed.inject(BookingService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const booking: IBooking = { id: 456 };

        activatedRoute.data = of({ booking });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(booking));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Booking>>();
        const booking = { id: 123 };
        jest.spyOn(bookingService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ booking });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: booking }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(bookingService.update).toHaveBeenCalledWith(booking);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Booking>>();
        const booking = new Booking();
        jest.spyOn(bookingService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ booking });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: booking }));
        saveSubject.complete();

        // THEN
        expect(bookingService.create).toHaveBeenCalledWith(booking);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Booking>>();
        const booking = { id: 123 };
        jest.spyOn(bookingService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ booking });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(bookingService.update).toHaveBeenCalledWith(booking);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
