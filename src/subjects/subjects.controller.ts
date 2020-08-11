import { Controller, Post, Body, ValidationPipe, Get, Query, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { GetUser } from 'src/common/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { Subjects } from './subjects.entity';
import { SubjectFilterDto } from './dto/subject-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Subjects')
@Controller('subjects')
@ApiBearerAuth()
export class SubjectsController {

    constructor(
        private service: SubjectsService
    ) {}

    @Post()
    @UseGuards(AuthGuard())
    async createNewSubject(
        @Body(ValidationPipe) createSubjectDto: CreateSubjectDto,
        @GetUser() user: Users
    ): Promise<Subjects> {
        return await this.service.createSubject(createSubjectDto, user);
    }

    @Get()
    async getSubjects(
        @Query(ValidationPipe) filterDto: SubjectFilterDto
    ): Promise<Subjects[]> {
        return await this.service.getAllSubjects(filterDto);
    }

}
