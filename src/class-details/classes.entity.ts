import { BaseEntity, Entity, ObjectIdColumn, ObjectID, Column, OneToMany, Unique } from "typeorm";
import { DefaultStatusEnum } from "../common/enum/default.status.enum";
import { Section } from "./section.entity";


@Entity()
@Unique(['name'])
export class Classes extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    sectionCount: number;

    @Column()
    status: DefaultStatusEnum;

    @Column()
    createdBy: string;

    sections: Section[];
}