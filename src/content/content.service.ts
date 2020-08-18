import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { ContentUploadDto } from './dto/content-upload.dto';
import { Users } from 'src/users/users.entity';
import { Content } from './content.entity';
import { FilterUploadDto } from './dto/filter-upload.dto';

@Injectable()
export class ContentService {

    constructor(
        @InjectRepository(ContentRepository)
        private contentRepo: ContentRepository
    ) {}

    async getContent(filterDto: FilterUploadDto): Promise<Content[]> {
        const {branch, classes, section, chapter, subject, type} = filterDto;
        let allContent = await this.contentRepo.find();
        if (branch) {
            allContent = allContent.filter(content => {
                return content.branch === branch;
            });
        }

        if (classes) {
            allContent = allContent.filter(content => {
                return content.classes === classes;
            });
        }

        if (section) {
            allContent = allContent.filter(content => {
                return content.section === section;
            });
        }

        if (subject) {
            allContent = allContent.filter(content => {
                return content.subject === subject;
            });
        }

        if (chapter) {
            allContent = allContent.filter(content => {
                return content.chapter === chapter;
            });
        }

        if (type) {
            allContent = allContent.filter(content => {
                return content.type === type;
            });
        }
        return allContent;
    }

    async deleteContent(id: string): Promise<void> {
        const result = await this.contentRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Content with ID: ${id} is not found.`);
        }
    }

    async addNewContent(contentDto: ContentUploadDto, user: Users, filename?:string): Promise<Content> {
        contentDto.content = (filename) ? filename : contentDto.content;
        return await this.contentRepo.addNewContent(contentDto, user);
    }

}
