import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AddNewStudentDto } from './dto/add-new-student.dto';
import { GetUser } from 'src/common/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { Students } from './students.entity';
import { AuthGuard } from '@nestjs/passport';
import { FilterStudentDto } from './dto/filter-student.dto';
import { StudentDetailsDto } from './dto/student-details.dto';

@ApiTags('Students')
@Controller('students')
export class StudentsController {

    constructor(private service: StudentsService) {
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async addNewStudent(
        @Body(ValidationPipe) addNewStudentDto: AddNewStudentDto,
        @GetUser() user: Users): Promise<Students> {
            return await this.service.addNewStudent(addNewStudentDto, user);
        }

    @Post('login')
    async getStudentDetailsByLogin(
        @Body(ValidationPipe) filterStudentDto: StudentDetailsDto): Promise<Students> {
            return await this.service.getStudentDetailsAuth(filterStudentDto);
        }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async getStudents(
        @Query(ValidationPipe) filterDto: FilterStudentDto,
        @GetUser() user: Users): Promise<Students[]> {
            return await this.service.getStudents(filterDto, user);
        }


}
