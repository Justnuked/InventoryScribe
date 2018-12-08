import {Item} from './item';

export class Inventory {
    id: string;
    type: String;
    maxCapacity: number;
    currentCapacity: number;
    items: Item[];
}