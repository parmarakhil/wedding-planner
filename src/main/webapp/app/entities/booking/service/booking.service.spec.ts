import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { Plan } from 'app/entities/enumerations/plan.model';
import { IBooking, Booking } from '../booking.model';

import { BookingService } from './booking.service';

describe('Service Tests', () => {
  describe('Booking Service', () => {
    let service: BookingService;
    let httpMock: HttpTestingController;
    let elemDefault: IBooking;
    let expectedResult: IBooking | IBooking[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(BookingService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        eventDate: currentDate,
        venue: 'AAAAAAA',
        plan: Plan.BRONZE,
        createdDate: currentDate,
        contactNumber: 'AAAAAAA',
        emailId: 'AAAAAAA',
        userName: 'AAAAAAA',
        userId: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            eventDate: currentDate.format(DATE_TIME_FORMAT),
            createdDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Booking', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            eventDate: currentDate.format(DATE_TIME_FORMAT),
            createdDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventDate: currentDate,
            createdDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Booking()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Booking', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            eventDate: currentDate.format(DATE_TIME_FORMAT),
            venue: 'BBBBBB',
            plan: 'BBBBBB',
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            contactNumber: 'BBBBBB',
            emailId: 'BBBBBB',
            userName: 'BBBBBB',
            userId: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventDate: currentDate,
            createdDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Booking', () => {
        const patchObject = Object.assign(
          {
            contactNumber: 'BBBBBB',
            userId: 'BBBBBB',
          },
          new Booking()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            eventDate: currentDate,
            createdDate: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Booking', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            eventDate: currentDate.format(DATE_TIME_FORMAT),
            venue: 'BBBBBB',
            plan: 'BBBBBB',
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            contactNumber: 'BBBBBB',
            emailId: 'BBBBBB',
            userName: 'BBBBBB',
            userId: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventDate: currentDate,
            createdDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Booking', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addBookingToCollectionIfMissing', () => {
        it('should add a Booking to an empty array', () => {
          const booking: IBooking = { id: 123 };
          expectedResult = service.addBookingToCollectionIfMissing([], booking);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(booking);
        });

        it('should not add a Booking to an array that contains it', () => {
          const booking: IBooking = { id: 123 };
          const bookingCollection: IBooking[] = [
            {
              ...booking,
            },
            { id: 456 },
          ];
          expectedResult = service.addBookingToCollectionIfMissing(bookingCollection, booking);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Booking to an array that doesn't contain it", () => {
          const booking: IBooking = { id: 123 };
          const bookingCollection: IBooking[] = [{ id: 456 }];
          expectedResult = service.addBookingToCollectionIfMissing(bookingCollection, booking);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(booking);
        });

        it('should add only unique Booking to an array', () => {
          const bookingArray: IBooking[] = [{ id: 123 }, { id: 456 }, { id: 52973 }];
          const bookingCollection: IBooking[] = [{ id: 123 }];
          expectedResult = service.addBookingToCollectionIfMissing(bookingCollection, ...bookingArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const booking: IBooking = { id: 123 };
          const booking2: IBooking = { id: 456 };
          expectedResult = service.addBookingToCollectionIfMissing([], booking, booking2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(booking);
          expect(expectedResult).toContain(booking2);
        });

        it('should accept null and undefined values', () => {
          const booking: IBooking = { id: 123 };
          expectedResult = service.addBookingToCollectionIfMissing([], null, booking, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(booking);
        });

        it('should return initial array if no Booking is added', () => {
          const bookingCollection: IBooking[] = [{ id: 123 }];
          expectedResult = service.addBookingToCollectionIfMissing(bookingCollection, undefined, null);
          expect(expectedResult).toEqual(bookingCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
