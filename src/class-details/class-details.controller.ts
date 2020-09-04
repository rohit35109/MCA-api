import { Controller, Get, Put, Post, Delete, Query, Body, ValidationPipe, Param, UseGuards } from '@nestjs/common';
import { ClassDetailsService } from './class-details.service';
import { Classes } from './classes.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ClassSectionDto } from './dto/class-section.dto';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/users/users.entity';
import { GetUser } from 'src/common/get-user.decorator';
import { DeleteResult } from 'typeorm';

@ApiTags('Class & Section')
@Controller('class-details')
export class ClassDetailsController {

    constructor(private service: ClassDetailsService) {}

    @Get()
    async getAllClassDetails(): Promise<Classes[]> {
        return this.service.getAllClassesAndSection();
    }

    @Get('id/:id')
    async getClassDetailsById(@Param('id') id: string): Promise<Classes> {
        return this.service.getClassById(id);
    }

    @Get('/page')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async getClassesAndSectionByPage(@Query('page') page: number): Promise<Classes[]> {
        return this.service.getClassesAndSectionByPage(page);
    }

    @Put()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async updateClass(
        @Body(ValidationPipe) classSectionDto: ClassSectionDto,
        ): Promise<Classes> {
        return this.service.updateClass(classSectionDto);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async createNewClassSection(
        @Body(ValidationPipe) classSectionDto: ClassSectionDto,
        @GetUser() user: Users
    ): Promise<void> {
        return this.service.createNewClassAndSection(classSectionDto, user);
    }

    @Delete('id/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async deleteStudent(@Param('id') id: string): Promise<DeleteResult> {
        return await this.service.deleteClass(id);
    }

}
