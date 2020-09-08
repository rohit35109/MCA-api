import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsRepository } from './students.repository';
import { AddNewStudentDto } from './dto/add-new-student.dto';
import { Users } from 'src/users/users.entity';
import { Classes } from 'src/class-details/classes.entity';
import { Students } from './students.entity';
import { FilterStudentDto } from './dto/filter-student.dto';
import { Roles } from 'src/common/enum/roles.enum';
import { StudentDetailsDto } from './dto/student-details.dto';
import { getMongoRepository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(StudentsRepository)
        private studentRepo: StudentsRepository
    ) { }

    async addNewStudent(addNewStudentDto: AddNewStudentDto, user: Users): Promise<Students> {
        return await this.studentRepo.addNewStudent(addNewStudentDto, user);
    }

    async udpateStudent(updateStudentDto: AddNewStudentDto): Promise<Students> {
        const student = await this.getStudentByID(updateStudentDto.id);
        student.branch = updateStudentDto.branch;
        student.classes = updateStudentDto.classes;
        student.name = updateStudentDto.name;
        student.roll = updateStudentDto.roll;
        student.watsapp = updateStudentDto.watsapp;
        student.section = updateStudentDto.section;
        student.year = updateStudentDto.year;
        student.uniqueCode = updateStudentDto.uniqueCode;
        await student.save();
        return student;
    }

    async deleteStudent(id: string): Promise<void> {
        const result = await this.studentRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Student with ID: ${id} cannot be deleted.`);
        }
    }

    async getStudentDetailsAuth(filterDto: StudentDetailsDto): Promise<Students> {
        return await this.studentRepo.findOne({
            where: {
                roll: filterDto.roll,
                watsapp: filterDto.watsapp
            }
        })
    }

    async getStudentByID(id: string): Promise<Students> {
        const student = await this.studentRepo.findOne(id);
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} was not found`);
        }
        return student;
    }

    async getStudents(filterDto: FilterStudentDto, user: Users): Promise<Students[]> {
        const { branch, classes, section, status, year } = filterDto;
        const classMongo = getMongoRepository(Classes);
        const studentMongo = getMongoRepository(Students);

        let classList = await classMongo.find();
        let clsList = classList.map(cls => cls.id.toString());
        let students = await studentMongo.aggregateEntity([
            { '$match': { 'classes': { '$in': clsList } } }
        ]).toArray();
        
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
        if (year) {
            students = students.filter((student) => {
                return String(new Date(student.year).getFullYear()) === year;
            });
        }
        return students;
    }

    async getStudentsCount(): Promise<{ data: number }> {
        const [students, count] = await this.studentRepo.findAndCount();
        return {
            data: count
        }
    }

    async getStudentsByPage(page: number): Promise<Students[]> {
        let skipValue = page * 10;
        let count = await this.studentRepo.count();
        const classMongo = getMongoRepository(Classes);
        const studentMongo = getMongoRepository(Students);
        if (count <= skipValue) {
            return [];
        }

        let classList = await classMongo.find();
        let clsList = classList.map(cls => cls.id.toString());

        return await studentMongo.aggregateEntity([
            { '$match': { 'classes': { '$in': clsList } } },
            { '$sort': { '_id': -1 } },
            { '$skip': skipValue },
            { '$limit': 10 }
        ]).toArray();
    }

    async studentCodeExitsOrNot(code): Promise<{ result: boolean }> {
        const student = await this.studentRepo.find({ uniqueCode: code });
        if (student.length > 0) {
            return {
                result: true
            }
        } else {
            return {
                result: false
            }
        }
    }

}
