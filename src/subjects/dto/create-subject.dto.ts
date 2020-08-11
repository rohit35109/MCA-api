import { DefaultStatusEnum } from "src/common/enum/default.status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray, IsEnum } from "class-validator";

export class CreateSubjectDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    chapters: Array<string>;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(DefaultStatusEnum)
    status: DefaultStatusEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    classes: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    branch: Array<string>;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    section: Array<string>;

}