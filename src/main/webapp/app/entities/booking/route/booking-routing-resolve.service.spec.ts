jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IBooking, Booking } from '../booking.model';
import { BookingService } from '../service/booking.service';

import { BookingRoutingResolveService } from './booking-routing-resolve.service';

describe('Service Tests', () => {
  describe('Booking routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: BookingRoutingResolveService;
    let service: BookingService;
    let resultBooking: IBooking | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(BookingRoutingResolveService);
      service = TestBed.inject(BookingService);
      resultBooking = undefined;
    });

    describe('resolve', () => {
      it('should return IBooking returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBooking = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultBooking).toEqual({ id: 123 });
      });

      it('should return new IBooking if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBooking = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultBooking).toEqual(new Booking());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Booking })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBooking = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultBooking).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
