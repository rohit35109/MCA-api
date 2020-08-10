import { Repository, EntityRepository, ObjectID } from "typeorm";
import { Section } from "./section.entity";
import { Classes } from "./classes.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {
    async createSection(
        name: string, classID: string
    ): Promise<void> {
        const sectionEntity = new Section();
        sectionEntity.name = name;
        sectionEntity.classes = classID;

        try {
            await sectionEntity.save();
        } catch(err) {
            throw new InternalServerErrorException(`
            Something Went wrong while saving Sections for Class ID "${classID}".
             Please contact administrator or Try again later.`);
        }
        
    }
}