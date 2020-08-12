import { Controller, Post, UseInterceptors, UploadedFile, Body, Res, Get, Param, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentUploadDto } from './dto/content-upload.dto';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { GetUser } from 'src/common/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { FilterUploadDto } from './dto/filter-upload.dto';

@ApiTags('Content')
@Controller('content')
export class ContentController {

    constructor(private service: ContentService) {}

    @Post()
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard())
    async createNewContent(
        @GetUser() user: Users,
        @Body() contentUploadDto: ContentUploadDto,
        @UploadedFile() file: any,
        ): Promise<Content> {
        const filename = (file && file.filename) ? file.filename : null;
        return await this.service.addNewContent(contentUploadDto, user, filename);
    }

    @Get()
    async getAllContent(
        @Query(ValidationPipe) filterDto: FilterUploadDto
    ): Promise<Content[]> {
        return await this.service.getContent(filterDto);
    }

    @Get('/:fileID')
    async getUploadedFileByID(@Param('fileID') fileID: string, @Res() res) {
        return await res.sendFile(fileID, {root: 'upload'});
    }

}
