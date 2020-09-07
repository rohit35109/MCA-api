import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectsRepository } from './subjects.repository';
import { getMongoRepository } from 'typeorm'
import { Classes } from 'src/class-details/classes.entity';
import { Subjects } from './subjects.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Users } from 'src/users/users.entity';
import { SubjectFilterDto } from './dto/subject-filter.dto';
import { DefaultStatusEnum } from 'src/common/enum/default.status.enum';
import { create } from 'domain';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(SubjectsRepository)
        private subjectsRepository: SubjectsRepository
    ) {}

    async createSubject(createSubjectDto: CreateSubjectDto, user: Users): Promise<Subjects> {
        return await this.subjectsRepository.createNewSubject(createSubjectDto, user);
    }

    async getSubjectByID(id: string): Promise<Subjects> {
        const subject = await this.subjectsRepository.findOne(id);
        if (!subject) {
            throw new NotFoundException(`Subject with ID ${id} was not found`);
        }
        return subject;
    }

    async getSubjectsByPage(page: number): Promise<Subjects[]> {
        let skipValue = page * 10;
        let count = await this.subjectsRepository.count();
        const classMongo = getMongoRepository(Classes);
        const subjectMongo = getMongoRepository(Subjects);
        if(count <= skipValue) {
            return [];
        }

        let classList = await classMongo.find();
        let clsList = classList.map(cls => cls.id.toString());
        
        return await subjectMongo.aggregateEntity([
            { '$match': { 'classes' : { '$in' : clsList }}},
            { '$match': { 'status' : 'ACTIVE' }},
            { '$sort': { '_id' : -1 } },
            { '$skip': skipValue },
            { '$limit': 10 }
        ]).toArray();
    }

    async deleteSubject(id: string): Promise<Subjects> {
        const subject = await this.getSubjectByID(id);
        subject.status = DefaultStatusEnum.DELETED;
        try {
            await subject.save();
        } catch(err) {
            throw new InternalServerErrorException('Something Went wrong. Please try again later');
        }
        return subject;
    }

    async updateSubject(createSubjectDto: CreateSubjectDto): Promise<Subjects> {
        const subject = await this.getSubjectByID(createSubjectDto.id);
        subject.name = createSubjectDto.name;
        subject.chapters = createSubjectDto.chapters;
        subject.branch = createSubjectDto.branch;
        subject.classes = createSubjectDto.classes;
        subject.section = createSubjectDto.section;
        subject.status = createSubjectDto.status;
        await subject.save();
        return subject;
    }

    async getAllSubjects(filterDto: SubjectFilterDto): Promise<Subjects[]> {
        const { branch, classes, section, status } = filterDto;
        let subjects = await this.subjectsRepository.find();
        if (branch) {
            subjects = subjects.filter((subject) => {
                return subject.branch.includes(branch);
            });
        }
        if (classes) {
            subjects = subjects.filter((subject) => {
                return subject.classes === classes;
            });
        }
        if (section) {
            subjects = subjects.filter((subject) => {
                return subject.section.includes(section);
            });
        }
        if (status) {
            subjects = subjects.filter((subject) => {
                return subject.status === status;
            });
        }
        return subjects;
    }

}
