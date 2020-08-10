import { Repository, EntityRepository } from "typeorm";
import { Classes } from "./classes.entity";
import { ClassSectionDto } from "./dto/class-section.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Classes)
export class ClassesRepository extends Repository<Classes> {

    async createClass(
        classSectionDto: ClassSectionDto
    ): Promise<Classes> {
        const { name, sectionCount, status  } = classSectionDto;
        const classes = new Classes();
        classes.name = name;
        classes.sectionCount = sectionCount;
        classes.status = status;

        try {
            await classes.save();
            return classes;
        } catch (err) {
            if (err.code === 11000) {
                throw new ConflictException('Class Name already Exists');
            } else {
                throw new InternalServerErrorException('Cannot Save Class. Please check Log');
            }
        }
    }
}