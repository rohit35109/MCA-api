import { Controller, Get, Post, Body, ValidationPipe, Param, UseGuards } from '@nestjs/common';
import { ClassDetailsService } from './class-details.service';
import { Classes } from './classes.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ClassSectionDto } from './dto/class-section.dto';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/users/users.entity';
import { GetUser } from 'src/common/get-user.decorator';

@ApiTags('Class & Section')
@Controller('class-details')
@ApiBearerAuth()
export class ClassDetailsController {

    constructor(private service: ClassDetailsService) {}

    @Get()
    @UseGuards(AuthGuard())
    async getAllClassDetails(): Promise<Classes[]> {
        return this.service.getAllClassesAndSection();
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    async getClassDetailsById(@Param('id') id: string): Promise<Classes> {
        return this.service.getClassById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createNewClassSection(
        @Body(ValidationPipe) classSectionDto: ClassSectionDto,
        @GetUser() user: Users
    ): Promise<void> {
        return this.service.createNewClassAndSection(classSectionDto, user);
    }

}
