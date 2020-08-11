import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { ContentUploadDto } from './dto/content-upload.dto';
import { Users } from 'src/users/users.entity';
import { Content } from './content.entity';

@Injectable()
export class ContentService {

    constructor(
        @InjectRepository(ContentRepository)
        private contentRepo: ContentRepository
    ) {}

    async addNewContent(contentDto: ContentUploadDto, user: Users, filename?:string): Promise<Content> {
        contentDto.content = (filename) ? filename : contentDto.content;
        return await this.contentRepo.addNewContent(contentDto, user);
    }

}
