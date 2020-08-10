import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { DefaultStatusEnum } from "src/common/enum/default.status.enum";

export class BranchDto {

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