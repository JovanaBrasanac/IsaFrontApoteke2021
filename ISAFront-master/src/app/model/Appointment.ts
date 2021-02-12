import { Doctor } from './Doctor';
import { AppointmentType } from './AppointmentType';
import { Pharmacy } from './Pharmacy';
import { HospitalRoom } from './HospitalRoom';
import { MedicalRecord } from './MedicalRecord';

export class Appointment {
    id: string = "";
    date: string = "";
    description: string = "";
    duration: number = 0;
    type: string = "";
    patient: string = "";
    doctorUsername: string = "";
    doctor: Doctor;
    hospitalRoom: HospitalRoom;
    medicalRecord: MedicalRecord;
    start: boolean = false;
    info: string = "";
    type2: AppointmentType = new AppointmentType();
    pharmacy: Pharmacy = new Pharmacy();
    price: number = 0;
}