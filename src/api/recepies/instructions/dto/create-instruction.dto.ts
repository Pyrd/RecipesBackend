import { Item } from "../../items/entities/item.entity";

export class CreateInstructionDto {
    title: string;
    description: string;
    duration: string;
    items: Item[]
}
