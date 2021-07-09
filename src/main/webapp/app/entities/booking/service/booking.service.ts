import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBooking, getBookingIdentifier } from '../booking.model';

export type EntityResponseType = HttpResponse<IBooking>;
export type EntityArrayResponseType = HttpResponse<IBooking[]>;

@Injectable({ providedIn: 'root' })
export class BookingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bookings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(booking: IBooking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(booking);
    return this.http
      .post<IBooking>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(booking: IBooking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(booking);
    return this.http
      .put<IBooking>(`${this.resourceUrl}/${getBookingIdentifier(booking) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(booking: IBooking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(booking);
    return this.http
      .patch<IBooking>(`${this.resourceUrl}/${getBookingIdentifier(booking) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBooking>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBooking[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addBookingToCollectionIfMissing(bookingCollection: IBooking[], ...bookingsToCheck: (IBooking | null | undefined)[]): IBooking[] {
    const bookings: IBooking[] = bookingsToCheck.filter(isPresent);
    if (bookings.length > 0) {
      const bookingCollectionIdentifiers = bookingCollection.map(bookingItem => getBookingIdentifier(bookingItem)!);
      const bookingsToAdd = bookings.filter(bookingItem => {
        const bookingIdentifier = getBookingIdentifier(bookingItem);
        if (bookingIdentifier == null || bookingCollectionIdentifiers.includes(bookingIdentifier)) {
          return false;
        }
        bookingCollectionIdentifiers.push(bookingIdentifier);
        return true;
      });
      return [...bookingsToAdd, ...bookingCollection];
    }
    return bookingCollection;
  }

  protected convertDateFromClient(booking: IBooking): IBooking {
    return Object.assign({}, booking, {
      eventDate: booking.eventDate?.isValid() ? booking.eventDate.toJSON() : undefined,
      createdDate: booking.createdDate?.isValid() ? booking.createdDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.eventDate = res.body.eventDate ? dayjs(res.body.eventDate) : undefined;
      res.body.createdDate = res.body.createdDate ? dayjs(res.body.createdDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((booking: IBooking) => {
        booking.eventDate = booking.eventDate ? dayjs(booking.eventDate) : undefined;
        booking.createdDate = booking.createdDate ? dayjs(booking.createdDate) : undefined;
      });
    }
    return res;
  }
}
