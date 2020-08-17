import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { DefaultStatusEnum } from "src/common/enum/default.status.enum";

export class BranchDto {

    @ApiPropertyOptional({
        description: `User only for Update`
    })
    @IsOptional()
    @IsString()
    id: string;

    @ApiProperty({
        description: `
        Provide Branch Name
        `
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: `
        Status should be ACTIVE/INACTIVE/DELETED 
        `
    })
    @IsNotEmpty()
    @IsEnum(DefaultStatusEnum)
    status: DefaultStatusEnum;
}