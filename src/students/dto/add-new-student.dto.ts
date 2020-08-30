import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional } from "class-validator";

export class AddNewStudentDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    roll: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    watsapp: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    classes: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    section: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    branch: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    uniqueCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    year: string;

}