import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class StudentDetailsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    roll: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    watsapp: number;
}