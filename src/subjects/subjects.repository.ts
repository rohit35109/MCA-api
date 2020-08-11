import { Repository, EntityRepository } from "typeorm";
import { Subjects } from "./subjects.entity";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { Users } from "src/users/users.entity";
import { InternalServerErrorException } from "@nestjs/common";
import { SubjectFilterDto } from "./dto/subject-filter.dto";

@EntityRepository(Subjects)
export class SubjectsRepository extends Repository<Subjects> {

    async createNewSubject(
        createSubjectDto: CreateSubjectDto,
        user: Users
    ): Promise<Subjects> {
        const { name, chapters, branch, classes, section, status } = createSubjectDto;
        const subject = new Subjects();
        subject.name = name;
        subject.branch = branch;
        subject.chapters = chapters;
        subject.classes = classes;
        subject.section = section;
        subject.status = status;
        subject.createdBy = user.id.toString();
        
        try {
            return await subject.save();
        } catch (err) {
            throw new InternalServerErrorException('Subject was not saved. Please try again or contact administrator.');
        }
    }

}