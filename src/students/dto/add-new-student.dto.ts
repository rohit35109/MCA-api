import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class AddNewStudentDto {

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
}