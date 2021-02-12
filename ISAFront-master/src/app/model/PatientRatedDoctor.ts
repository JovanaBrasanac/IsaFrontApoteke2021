import { Patient } from './Patient';
import { Doctor } from './Doctor';

export class PatientRatedDoctor {
    doctor: Doctor;
    patient: Patient;
    ocena: number;
    doctorUsername: String;
    patientUsername: String;
}