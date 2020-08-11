import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiTags } from '@nestjs/swagger';
import { AddNewStudentDto } from './dto/add-new-student.dto';
import { GetUser } from 'src/common/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { Students } from './students.entity';
import { AuthGuard } from '@nestjs/passport';
import { FilterStudentDto } from './dto/filter-student.dto';

@ApiTags('Students')
@Controller('students')
@UseGuards(AuthGuard())
export class StudentsController {

    constructor(private service: StudentsService) {
    }

    @Post()
    async addNewStudent(
        @Body(ValidationPipe) addNewStudentDto: AddNewStudentDto,
        @GetUser() user: Users): Promise<Students> {
            return await this.service.addNewStudent(addNewStudentDto, user);
        }

    @Get()
    async getStudents(
        @Query(ValidationPipe) filterDto: FilterStudentDto,
        @GetUser() user: Users): Promise<Students[]> {
            return await this.service.getStudents(filterDto, user);
        }


}
