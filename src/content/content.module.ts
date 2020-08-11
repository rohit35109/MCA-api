import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: './upload'
    }),
    TypeOrmModule.forFeature([
      ContentRepository
    ]),
    UsersModule
  ],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
