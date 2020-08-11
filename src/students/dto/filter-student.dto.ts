import { IsOptional, IsIn } from "class-validator";
import { DefaultStatusEnum } from "src/common/enum/default.status.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FilterStudentDto {

    @IsOptional()
    @ApiPropertyOptional()
    branch: string;

    @IsOptional()
    @ApiPropertyOptional()
    classes: string;

    @IsOptional()
    @ApiPropertyOptional()
    section: string;

    @IsOptional()
    @ApiPropertyOptional()
    @IsIn([DefaultStatusEnum.ACTIVE, DefaultStatusEnum.DELETED, DefaultStatusEnum.INACTIVE])
    status: string;
}