import { Controller, Get, Param, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { Branch } from './branch.entity';
import { BranchService } from './branch.service';
import { BranchDto } from './dto/branch.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('branch')
@ApiTags('Branch')
@ApiBearerAuth()
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
    @UseGuards(AuthGuard())
    createNewBranch(@Body(ValidationPipe) branchDto: BranchDto): Promise<void> {
        return this.branchService.createNewBranch(branchDto);
    }

}
