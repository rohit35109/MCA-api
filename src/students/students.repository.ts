import { Repository, EntityRepository } from "typeorm";
import { Students } from "./students.entity";
import { AddNewStudentDto } from "./dto/add-new-student.dto";
import { Users } from "src/users/users.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Students)
export class StudentsRepository extends Repository<Students> {

    async addNewStudent(addNewStudentDto: AddNewStudentDto, user: Users): Promise<Students> {
        const { branch, classes, name, roll, section, watsapp, year, uniqueCode } = addNewStudentDto;
        const student = new Students();
        student.name = name;
        student.roll = roll;
        student.branch = branch;
        student.classes = classes;
        student.section = section;
        student.watsapp = watsapp;
        student.year = year;
        student.uniqueCode = uniqueCode;
        student.createdBy = user.id.toString();
        try {
            return await student.save();
        } catch (error) {
            throw new InternalServerErrorException('Student was not added. Please check log');
        }

    }

}