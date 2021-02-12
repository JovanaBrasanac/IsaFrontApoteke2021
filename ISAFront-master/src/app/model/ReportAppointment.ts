import { Appointment } from './Appointment';
import { Diagnosis } from './Diagnosis';
import { Recipe } from './Recipe';

export class ReportAppointment {
    appointment: Appointment = new Appointment();
    diagnosis: Diagnosis = new Diagnosis();
    recipe: Recipe = new Recipe();
}