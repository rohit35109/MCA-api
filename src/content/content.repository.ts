import { Repository, EntityRepository } from "typeorm";
import { Content } from "./content.entity";
import { ContentUploadDto } from "./dto/content-upload.dto";
import { Users } from "src/users/users.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
    async addNewContent(createNewContent: ContentUploadDto, user: Users): Promise<Content> {
        const { type, branch, classes, content, section, chapter, subject, title} = createNewContent;
        const contDB = new Content();
        contDB.type = type;
        contDB.classes = classes;
        contDB.branch = branch;
        contDB.section = section;
        contDB.content = content;
        contDB.subject = subject;
        contDB.chapter = chapter;
        contDB.title = title;
        contDB.addedBy = user.id.toString();

        try {
            return await contDB.save();
        } catch (error) {
            throw new InternalServerErrorException(`Something went wrong while saving content.
             Please try again or contact administrator`);
        }
    }
}