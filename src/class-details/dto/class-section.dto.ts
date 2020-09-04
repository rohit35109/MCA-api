import { DefaultStatusEnum } from "src/common/enum/default.status.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ClassSectionDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    id: string;

    @ApiProperty({
        description: `
            Class Name should be unique
        `
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: `
            Will be used to generate sections
        `
    })
    @IsNotEmpty()
    sectionCount: number;

    @ApiProperty({
        description: `
            ACTIVE/INACTIVE/DELETED
        `
    })
    @IsNotEmpty()
    status: DefaultStatusEnum;

}