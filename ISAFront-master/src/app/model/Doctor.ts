import { Pharmacy } from './Pharmacy';

export class Doctor {
    id: number;
    username: string = "";
    password: string = "";
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    address: string = "";
    city: string = "";
    country: string = "";
    mobileNumber: number;
    oldPassword: string = "";
    jmbg: number;
    review: number;
    pocetakRadnogVremena: string = "";
    rating: number = 0;
    krajRadnogVremena: String = "";
    clinic: Pharmacy = new Pharmacy();


}