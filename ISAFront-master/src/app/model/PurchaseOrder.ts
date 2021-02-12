import { ClinicAdministrator } from "./ClinicAdministrator";
import { Drug } from "./Drug";
import { PurchaseOffer } from "./PurchaseOffer";

export class PurchaseOrder {
    id: string ;
    drugs: Drug[];
    date: string;
    pharmacyAdmin: ClinicAdministrator;
    purchaseOffers: PurchaseOffer[];
    name: string;
}