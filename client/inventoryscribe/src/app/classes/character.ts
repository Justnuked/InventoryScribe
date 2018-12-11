import{Inventory} from './inventory';

export class Character {
    _id: string;
    name: String;
    class: String;
    race: String;
    inventories: Inventory[];
}