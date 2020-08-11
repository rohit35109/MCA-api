import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsRepository } from './students.repository';
import { AddNewStudentDto } from './dto/add-new-student.dto';
import { Users } from 'src/users/users.entity';
import { Students } from './students.entity';
import { FilterStudentDto } from './dto/filter-student.dto';
import { Roles } from 'src/common/enum/roles.enum';
import { StudentDetailsDto } from './dto/student-details.dto';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(StudentsRepository)
        private studentRepo: StudentsRepository
    ) {
    }

    async addNewStudent(addNewStudentDto: AddNewStudentDto, user: Users): Promise<Students> {
        return await this.studentRepo.addNewStudent(addNewStudentDto, user);
    }

    async getStudentDetailsAuth(filterDto: StudentDetailsDto): Promise<Students> {
        return await this.studentRepo.findOne({
            where: {
                roll: filterDto.roll,
                watsapp: filterDto.watsapp
            }
        })
    }

    async getStudents(filterDto: FilterStudentDto, user: Users): Promise<Students[]> {
        const { branch, classes, section, status } = filterDto;
        let students = await this.studentRepo.find();
        if (branch) {
            students = students.filter((student) => {
                return student.branch === branch;
            });
        }
        if (classes) {
            students = students.filter((student) => {
                return student.classes === classes;
            });
        }
        if (section) {
            students = students.filter((student) => {
                return student.section === section;
            });
        }
        if (status) {
            students = students.filter((student) => {
                return student.status === status;
            });
        }
        return students;
    }
}
