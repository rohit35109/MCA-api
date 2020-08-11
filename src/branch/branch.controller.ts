import { Controller, Get, Param, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { Branch } from './branch.entity';
import { BranchService } from './branch.service';
import { BranchDto } from './dto/branch.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/get-user.decorator';
import { Users } from 'src/users/users.entity';

@Controller('branch')
@ApiTags('Branch')
export class BranchController {

    constructor(private branchService: BranchService) {}

    @Get()
    getAllBranches(): Promise<Branch[]> {
        return this.branchService.getAllBranches();
    }

    @Get('/:id')
    getBranchById(@Param('id') id: string): Promise<Branch> {
        return this.branchService.getBranchId(id);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    createNewBranch(
        @Body(ValidationPipe) branchDto: BranchDto,
        @GetUser() user: Users
    ): Promise<void> {
        return this.branchService.createNewBranch(branchDto, user);
    }

}
