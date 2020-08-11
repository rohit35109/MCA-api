import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database-connection/typeorm.config';
import { BranchModule } from './branch/branch.module';
import { ClassDetailsModule } from './class-details/class-details.module';
import { StudentsModule } from './students/students.module';
import { ContentModule } from './content/content.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    BranchModule,
    ClassDetailsModule,
    StudentsModule,
    ContentModule,
    SubjectsModule,
  ],

})
export class AppModule {
}
