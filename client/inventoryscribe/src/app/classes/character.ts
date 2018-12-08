import{Inventory} from './inventory';

export class Character {
    id: string;
    name: String;
    class: String;
    race: String;
    inventories: Inventory[];
}