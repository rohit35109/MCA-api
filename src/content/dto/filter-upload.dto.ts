import { ContentTypeEnum } from "../enum/content-type.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FilterUploadDto {

    @ApiPropertyOptional()
    @IsOptional()
    classes: string;

    @ApiPropertyOptional()
    @IsOptional()
    section: string;

    @ApiPropertyOptional()
    @IsOptional()
    type: ContentTypeEnum;

    @ApiPropertyOptional()
    @IsOptional()
    branch: string;

    @ApiPropertyOptional()
    @IsOptional()
    subject: string;

    @ApiPropertyOptional()
    @IsOptional()
    chapter: string;

}