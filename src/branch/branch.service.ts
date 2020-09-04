import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchRepository } from './branch.repository';
import { getMongoRepository } from 'typeorm'
import { Branch } from './branch.entity';
import { BranchDto } from './dto/branch.dto';
import { Users } from 'src/users/users.entity';
import { DefaultStatusEnum } from 'src/common/enum/default.status.enum';

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
        const branch = await this.branchRepository.findOne(id);
        if (!branch) {
            throw new NotFoundException(`Branch with ID ${id} was not found`);
        }
        return branch;
    }

    public async getBranchesByPage(page: number): Promise<Branch[]> {
        let skipValue = page * 10;
        let count = await this.branchRepository.count();
        const branchMongo = getMongoRepository(Branch);
        if(count <= skipValue) {
            return [];
        }
        
        return await branchMongo.aggregateEntity([
            { '$sort': { '_id' : -1 } },
            { '$skip': skipValue },
            { '$limit': 10 }
        ]).toArray();
    }

    public async updateBranch(branchDto: BranchDto): Promise<Branch> {
        const branch = await this.getBranchId(branchDto.id);
        branch.name = branchDto.name;
        branch.status = branchDto.status;
        try {
            await branch.save();
        } catch(err) {
            if (err.code === 11000) {
                throw new ConflictException('Batch Name already exists');
            } else {
                throw new InternalServerErrorException('Something went wrong. Please contact administrator');
            }
        }
        return branch;
    }

    public async deleteBranch(id: string): Promise<Branch> {
        const branch = await this.getBranchId(id);
        branch.status = DefaultStatusEnum.DELETED;
        await branch.save();
        return branch;
    }

    public async createNewBranch(branchDto: BranchDto, user: Users): Promise<void> {
        return await this.branchRepository.newBranch(branchDto, user);
    }
}
