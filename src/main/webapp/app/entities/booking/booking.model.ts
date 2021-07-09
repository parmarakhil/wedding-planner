import * as dayjs from 'dayjs';
import { Plan } from 'app/entities/enumerations/plan.model';

export interface IBooking {
  id?: number;
  eventDate?: dayjs.Dayjs;
  venue?: string;
  plan?: Plan;
  createdDate?: dayjs.Dayjs;
  contactNumber?: string;
  emailId?: string;
  userName?: string | null;
  userId?: string | null;
}

export class Booking implements IBooking {
  constructor(
    public id?: number,
    public eventDate?: dayjs.Dayjs,
    public venue?: string,
    public plan?: Plan,
    public createdDate?: dayjs.Dayjs,
    public contactNumber?: string,
    public emailId?: string,
    public userName?: string | null,
    public userId?: string | null
  ) {}
}

export function getBookingIdentifier(booking: IBooking): number | undefined {
  return booking.id;
}
