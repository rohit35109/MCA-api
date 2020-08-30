import { BaseEntity, Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";
import { DefaultStatusEnum } from "src/common/enum/default.status.enum";

@Entity()
export class Students extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    roll: string;

    @Column()
    watsapp: number;

    @Column({
        default: DefaultStatusEnum.ACTIVE
    })
    status: DefaultStatusEnum;

    @Column()
    classes: string;

    @Column()
    section: string;

    @Column()
    branch: string;

    @Column()
    year: string;

    @Column()
    uniqueCode: string;

    @Column()
    createdBy: string;

    @Column({
        default: new Date()
    })
    createdOn: Date;
}