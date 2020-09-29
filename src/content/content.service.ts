import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { getMongoRepository } from 'typeorm';
import { ContentUploadDto } from './dto/content-upload.dto';
import { Classes } from 'src/class-details/classes.entity';
import { Subjects } from 'src/subjects/subjects.entity';
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
        const classMongo = getMongoRepository(Classes);
        const subjectMongo = getMongoRepository(Subjects);
        const contentMongo = getMongoRepository(Content);

        let classList = await classMongo.find();
        let clsList = classList.map(cls => cls.id.toString());
        let subjectList = (await subjectMongo.find()).filter(sub => sub.status == 'ACTIVE');
        let subList = subjectList.map(sub => sub.id.toString());

        let allContent = await contentMongo.aggregateEntity([
            { '$match': { 'classes' : { '$in' : clsList }}},
            { '$match': { 'subject' : { '$in' : subList }}},
            { '$sort': { 'createdOn': -1 } },
        ]).toArray();
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
        // allContent = allContent.sort((a: any, b: any) => b.createdOn - a.createdOn);
        return allContent;
    }

    async getContentByPage(page: number, filterDto: FilterUploadDto): Promise<Content[]> {
        const {branch, classes, section, chapter, subject, type} = filterDto;
        let skipValue = page * 10;
        let count = await this.contentRepo.count();
        const classMongo = getMongoRepository(Classes);
        const subjectMongo = getMongoRepository(Subjects);
        const contentMongo = getMongoRepository(Content);
        if(count <= skipValue) {
            return [];
        }

        let classList = await classMongo.find();
        let clsList = classList.map(cls => cls.id.toString());

        let subjectList = (await subjectMongo.find()).filter(sub => sub.status == 'ACTIVE');
        let subList = subjectList.map(sub => sub.id.toString());
        
        let allContent = await contentMongo.aggregateEntity([
            { '$match': { 'classes' : { '$in' : clsList }}},
            { '$match': { 'subject' : { '$in' : subList }}},
            { '$sort': { 'createdOn': -1 } },
            { '$skip': skipValue },
            { '$limit': 10 }
        ]).toArray();

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
