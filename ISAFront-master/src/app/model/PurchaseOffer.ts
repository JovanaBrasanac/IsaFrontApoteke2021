import { Drug } from "./Drug";
import { PurchaseOrder } from "./PurchaseOrder";

export class PurchaseOffer {
    id: string ;
    drugs: Drug[];
    purchaseOrder: PurchaseOrder;
}