import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsRepository } from './students.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentsRepository
    ]),
    UsersModule
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
