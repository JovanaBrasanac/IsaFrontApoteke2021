import { Pharmacy } from "./Pharmacy";

export class Drug {
    id: number;
    name: string = "";
    quantity: number = 0;
    price: number = 0;
    selected: boolean = false;
    pharmacy: Pharmacy;
}