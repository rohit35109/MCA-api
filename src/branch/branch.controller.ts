import { Controller, Get, Param, Query, Post, Body, ValidationPipe, UseGuards, Patch, Delete, Put } from '@nestjs/common';
import { Branch } from './branch.entity';
import { BranchService } from './branch.service';
import { BranchDto } from './dto/branch.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/get-user.decorator';
import { Users } from 'src/users/users.entity';
import { DefaultStatusEnum } from 'src/common/enum/default.status.enum';

@Controller('branch')
@ApiTags('Branch')
export class BranchController {

    constructor(private branchService: BranchService) {}

    @Get()
    async getAllBranches(): Promise<Branch[]> {
        return await this.branchService.getAllBranches();
    }

    @Get('id/:id')
    async getBranchById(@Param('id') id: string): Promise<Branch> {
        return await this.branchService.getBranchId(id);
    }

    @Get('/page')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async getUserByPage(@Query('page') page: number): Promise<Branch[]> {
        return this.branchService.getBranchesByPage(page);
    }

    @Put()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async updateBranch(
        @Body(ValidationPipe) branchDto: BranchDto
    ): Promise<Branch> {
        return await this.branchService.updateBranch(branchDto);
    }

    @Delete('id/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async deleteBranch(
        @Param('id') id: string
    ): Promise<Branch> {
        return await this.branchService.deleteBranch(id);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async createNewBranch(
        @Body(ValidationPipe) branchDto: BranchDto,
        @GetUser() user: Users
    ): Promise<void> {
        return await this.branchService.createNewBranch(branchDto, user);
    }

}
