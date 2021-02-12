import { Doctor } from './Doctor';
import { HospitalRoom } from './HospitalRoom';
import { Surgery } from './Surgery';
import { Appointment } from './Appointment';

export class ReservationAppointmentRoom {
    doctor: any;
    appointment: Appointment = new Appointment();
}