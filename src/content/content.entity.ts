import { BaseEntity, Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";
import { ContentTypeEnum } from "./enum/content-type.enum";
@Entity()
export class Content extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({
        default: ContentTypeEnum.VIDEO_LINK
    })
    type: ContentTypeEnum;

    @Column()
    content: string;

    @Column()
    addedBy: string;

    @Column()
    classes: string;

    @Column()
    section: string;

    @Column()
    branch: string;

    @Column({
        default: new Date()
    })
    createdOn: Date;
}