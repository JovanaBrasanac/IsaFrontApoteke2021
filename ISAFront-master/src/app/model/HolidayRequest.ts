import { Doctor } from './Doctor';

export class HolidayRequest {
    dateStart: Date;
    dateEnd: Date;
    username: String = "";
    medicalStaff: Doctor = new Doctor();
    id: number = 0;
    confirmed: boolean = false;
}