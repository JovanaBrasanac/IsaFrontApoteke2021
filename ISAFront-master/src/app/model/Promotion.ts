import { Patient } from "./Patient";
import { Pharmacy } from "./Pharmacy";

export class Promotion {
    description: string = "";
    id: string;
    pharmacy: Pharmacy;
    patients: Patient[];
    date: string = "";
}