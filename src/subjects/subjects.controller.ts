import { Controller, Post, Body, ValidationPipe, Get, Query, UseGuards, Param, Put } from '@nestjs/common';
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
export class SubjectsController {

    constructor(
        private service: SubjectsService
    ) {}

    @Post()
    @ApiBearerAuth()
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

    @Get(':id')
    async getSubjectsByID(@Param('id') id: string): Promise<Subjects> {
        return await this.service.getSubjectByID(id);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async udpateSubject(
        @Body(ValidationPipe) createSubjectDto: CreateSubjectDto
    ): Promise<Subjects> {
        return await this.service.updateSubject(createSubjectDto);
    }
}
