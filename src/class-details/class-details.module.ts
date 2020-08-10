import { Module } from '@nestjs/common';
import { ClassDetailsController } from './class-details.controller';
import { ClassDetailsService } from './class-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesRepository } from './classes.repository';
import { SectionRepository } from './section.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassesRepository, SectionRepository
    ]),
  ],
  controllers: [ClassDetailsController],
  providers: [ClassDetailsService]
})
export class ClassDetailsModule {}
