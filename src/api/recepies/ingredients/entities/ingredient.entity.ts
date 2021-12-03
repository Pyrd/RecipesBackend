import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { UnitTypes } from '../../shared/unit-types.enum';
@Entity()
export class Ingredient {
    @ApiProperty()
    @PrimaryGeneratedColumn('rowid')
    id: string;
    @ApiProperty()
    @ManyToMany(() => Item)
    @JoinTable()
    item: Item[]

    @ApiProperty()
    @Column({
        nullable: false,
    })
    quantity: string; @ApiProperty()
    @Column({
        nullable: false,
    })
    unit: UnitTypes

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}
