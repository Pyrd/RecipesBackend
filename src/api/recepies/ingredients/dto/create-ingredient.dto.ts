import { Item } from "../../items/entities/item.entity";
import { UnitTypes } from "../../shared/unit-types.enum";

export class CreateIngredientDto {
    item: Item[]
    quantity: string;
    unit: UnitTypes
}
