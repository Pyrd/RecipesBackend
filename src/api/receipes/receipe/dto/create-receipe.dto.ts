import { Instruction } from "../../instructions/entities/instruction.entity";
import { Item } from "../../items/entities/item.entity";
import { Tag } from "../../tags/entities/tag.entity";

export class CreateReceipeDto {
    title: string;
    description: string;
    duration: string;
    tags: Tag[]
    instructions: Instruction[]
    items: Item[]
    is_public: boolean
}
