import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ContentTypeEnum } from "../enum/content-type.enum";
import { IsNotEmpty, IsIn, IsOptional, IsMimeType, IsString } from "class-validator";

export class ContentUploadDto {

    @ApiPropertyOptional({
        type: 'string',
        format: 'binary'
    })
    @IsOptional()
    @IsMimeType()
    file: any;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn([ContentTypeEnum.DOCUMENT_FILE, ContentTypeEnum.DOCUMENT_LINK, ContentTypeEnum.VIDEO_LINK])
    type: ContentTypeEnum;

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    content: string;

    @IsNotEmpty()
    @ApiProperty()
    classes: string;

    @IsNotEmpty()
    @ApiProperty()
    section: string;

    @IsNotEmpty()
    @ApiProperty()
    branch: string;

    @IsNotEmpty()
    @ApiProperty()
    subject: string;

    @IsNotEmpty()
    @ApiProperty()
    chapter: string;

    @IsNotEmpty()
    @ApiProperty()
    title: string;
}