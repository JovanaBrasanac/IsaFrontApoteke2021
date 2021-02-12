import { Drug } from "./Drug";
import { Patient } from "./Patient";
import { Pharmacy } from "./Pharmacy";

export class DrugReservation {
    constructor(
        public id: number,
        public drug: Drug,
        public patient: Patient,
    ){}

    
}