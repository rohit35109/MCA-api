import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Roles } from "src/common/enum/roles.enum";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @ApiProperty({
        description: `
            Email ID should be unique.
        `
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: `
            Should be of length between 6 to 30.
        `
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(30)
    password: string;

    @ApiProperty({
        description: `
            Value should be either ADMIN/STAFF.
        `
    })
    @IsNotEmpty()
    @IsString()
    @IsEnum(Roles)
    roles: Roles;
    

    @ApiPropertyOptional({
        default: "",
        description: `
            Optional and should be passed if Staff.
        `
    })
    @IsOptional()
    branch: string;

    @ApiPropertyOptional({
        default: "",
        description: `
            Optional and should be passed if Staff.
        `
    })
    @IsOptional()
    classes: string;

    @ApiPropertyOptional({
        default: "",
        description: `
            Optional and should be passed if Staff.
        `
    })
    @IsOptional()
    section: string;
}