import { Module } from '@nestjs/common';
import { ClassDetailsController } from './class-details.controller';
import { ClassDetailsService } from './class-details.service';

@Module({
  controllers: [ClassDetailsController],
  providers: [ClassDetailsService]
})
export class ClassDetailsModule {}
