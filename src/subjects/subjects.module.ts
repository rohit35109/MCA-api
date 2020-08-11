import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsRepository } from './subjects.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubjectsRepository
    ]),
    UsersModule
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService]
})
export class SubjectsModule {}
