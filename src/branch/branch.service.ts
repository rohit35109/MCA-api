import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchRepository } from './branch.repository';
import { Branch } from './branch.entity';
import { BranchDto } from './dto/branch.dto';
import { Users } from 'src/users/users.entity';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(BranchRepository)
        private branchRepository: BranchRepository
    ) {}

    public async getAllBranches(): Promise<Branch[]> {
        return await this.branchRepository.find({
            select: [ "id", "name", "status", "createdBy" ]
        });
    }

    public async getBranchId(id: string): Promise<Branch> {
        return await this.branchRepository.findOne(id);
    }

    public async createNewBranch(branchDto: BranchDto, user: Users): Promise<void> {
        return await this.branchRepository.newBranch(branchDto, user);
    }
}
