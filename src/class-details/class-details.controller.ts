import { Controller, Get, Post, Body, ValidationPipe, Param } from '@nestjs/common';
import { ClassDetailsService } from './class-details.service';
import { Classes } from './classes.entity';
import { ApiTags } from '@nestjs/swagger';
import { ClassSectionDto } from './dto/class-section.dto';

@ApiTags('Class & Section')
@Controller('class-details')
export class ClassDetailsController {

    constructor(private service: ClassDetailsService) {}

    @Get()
    async getAllClassDetails(): Promise<Classes[]> {
        return this.service.getAllClassesAndSection();
    }

    @Get('/:id')
    async getClassDetailsById(@Param('id') id: string): Promise<Classes> {
        return this.service.getClassById(id);
    }

    @Post()
    async createNewClassSection(
        @Body(ValidationPipe) classSectionDto: ClassSectionDto
    ): Promise<void> {
        return this.service.createNewClassAndSection(classSectionDto);
    }

}
