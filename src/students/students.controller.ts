import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Query, Param, Put, Delete } from '@nestjs/common';
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

    @Put()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async updateStudent(
        @Body(ValidationPipe) addNewStudentDto: AddNewStudentDto): Promise<Students> {
            return await this.service.udpateStudent(addNewStudentDto);
        }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async deleteStudent(@Param('id') id: string): Promise<void> {
        return await this.service.deleteStudent(id);
    }

    @Post('login')
    async getStudentDetailsByLogin(
        @Body(ValidationPipe) filterStudentDto: StudentDetailsDto): Promise<Students> {
            return await this.service.getStudentDetailsAuth(filterStudentDto);
        }

    @Get(':id')
    async getStudentId(@Param('id') id: string): Promise<Students> {
            return await this.service.getStudentByID(id);
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
