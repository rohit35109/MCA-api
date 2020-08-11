import { BaseEntity, Entity, ObjectIdColumn, ObjectID, Column, Unique } from "typeorm";
import { DefaultStatusEnum } from "src/common/enum/default.status.enum";

@Entity()
@Unique(['name'])
export class Branch extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    status: DefaultStatusEnum;

    @Column()
    createdBy: string;

}