import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClassesRepository } from './classes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionRepository } from './section.repository';
import { ClassSectionDto } from './dto/class-section.dto';
import { Classes } from './classes.entity';
import { Section } from './section.entity';
import { Users } from 'src/users/users.entity';

@Injectable()
export class ClassDetailsService {
    constructor(
        @InjectRepository(ClassesRepository)
        private classes: ClassesRepository,

        @InjectRepository(SectionRepository)
        private section: SectionRepository
    ) {}

    async getAllClassesAndSection(): Promise<Classes[]> {
        const classDetails = await this.classes.find();
        if (!classDetails) {
            throw new NotFoundException('Class List Not Found');
        }
        const udpatedClassDetails = Promise.all(classDetails.map(singleClass => {
            return this.getAllSectionsForClassID(singleClass.id.toString()).then(item => {
                singleClass.sections = item;
                return singleClass;
            });
        }));
        return udpatedClassDetails;
    }

    async getClassById(id: string): Promise<Classes> {
        const classDetail = await this.classes.findOne(id);
        if (!classDetail) {
            throw new NotFoundException(`Class with ID "${id}" was not found.`);
        }

        classDetail.sections = await this.getAllSectionsForClassID(classDetail.id.toString());
        return classDetail;
    }

    async createNewClassAndSection(classSection: ClassSectionDto, user: Users): Promise<void> {
        const sectionCount = classSection.sectionCount;
        const savedClassDetails = this.classes.createClass(classSection, user);
        return savedClassDetails.then(savedClassDetail => {
            if (!savedClassDetail) {
                throw new InternalServerErrorException('Something Went Wrong. Please check the log');
            }
            const sections = this.generateSectionsForTheClass(sectionCount);
            sections.forEach(async (sec) => {
                await this.section.createSection(sec, savedClassDetail.id.toString());
            });
        });
    }

    private generateSectionsForTheClass(numberOfSection: number): Array<string> {
        const section: Array<string> = [];
        let alphabet = 'A';
        if (numberOfSection > 0) {
            for (let i = 0; i < numberOfSection; i++) {
                alphabet = String.fromCharCode(alphabet.charCodeAt(0) + (i === 0 ? 0 : 1));
                section.push(alphabet)
            }
        }
        return section;
    }

    private async getAllSectionsForClassID(id: string): Promise<Section[]> {
        try {
            const item = await this.section.find({
                where: {
                    classes: id
                }
            });
            return item;
        } catch(err) {
            throw new NotFoundException(`Sections were not found for the Class ID: ${id}`);
        }
    }
}
