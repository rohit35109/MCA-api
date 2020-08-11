import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectsRepository } from './subjects.repository';
import { Subjects } from './subjects.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Users } from 'src/users/users.entity';
import { SubjectFilterDto } from './dto/subject-filter.dto';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(SubjectsRepository)
        private subjectsRepository: SubjectsRepository
    ) {}

    async createSubject(createSubjectDto: CreateSubjectDto, user: Users): Promise<Subjects> {
        return await this.subjectsRepository.createNewSubject(createSubjectDto, user);
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
