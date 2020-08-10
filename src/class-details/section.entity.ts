import { BaseEntity, Entity, Unique, ObjectIdColumn, Column, ManyToOne, ObjectID } from "typeorm";
import { Classes } from "./classes.entity";

@Entity()
export class Section extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    classes: string;
}