import { Repository, EntityRepository } from "typeorm";
import { Branch } from "./branch.entity";
import { Logger, InternalServerErrorException, ConflictException } from "@nestjs/common";
import { BranchDto } from "./dto/branch.dto";

@EntityRepository(Branch)
export class BranchRepository extends Repository<Branch> {
    private logger = new Logger('Branch Repository');

    async newBranch(branchDto: BranchDto): Promise<void> {
        const { name, status } = branchDto;
        const branch = new Branch();
        branch.name = name;
        branch.status = status;
        try {
            await branch.save()
            this.logger.log("Saved New Branch");
        } catch(err) {
            if (err.code === 11000) {
                throw new ConflictException('Branch Name already exisits');
            } else {
                throw new InternalServerErrorException('Something Went wrong. Please check the server Log');
            }
        }
    }
}