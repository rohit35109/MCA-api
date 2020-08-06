import { BaseEntity, Entity, Column, Unique, ObjectIdColumn, ObjectID } from "typeorm";
import { DefaultStatusEnum } from "src/common/enum/default.status.enum";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    status: DefaultStatusEnum;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}