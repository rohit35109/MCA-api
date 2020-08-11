import { BaseEntity, Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { DefaultStatusEnum } from "src/common/enum/default.status.enum";

@Entity()
export class Subjects extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    chapters: Array<string>;

    @Column()
    createdBy: string;

    @Column()
    status: DefaultStatusEnum;

    @Column()
    branch: Array<string>;

    @Column()
    classes: string;

    @Column()
    section: Array<string>;

}