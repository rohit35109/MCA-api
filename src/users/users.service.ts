import { Injectable, NotFoundException, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { Roles } from 'src/common/enum/roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private logger = new Logger('User Service');
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
        private jwtService: JwtService,
    ) {
        this.checkIfMasterAdminExistsAndAdd();
    }

    async getAllUsers(): Promise<Users[]> {
        return await this.userRepository.find({
            select: ["id", "name", "email", "status", "classes", "createdBy",
             "section", "branch"]
        });
    }

    async getUsersByPage(page: number): Promise<Users[]> {
        let skipValue = page * 10;
        let count = await this.userRepository.count();
        const userMongo = getMongoRepository(Users);
        if(count <= skipValue) {
            return [];
        }
        
        return await userMongo.aggregateEntity([
            { '$sort': { '_id' : -1 } },
            { '$skip': skipValue },
            { '$limit': 10 }
        ]).toArray();
    }

    async getUserById(id: string): Promise<Users> {
        let found = null
        try {
            found = await this.userRepository.findOne(id, {
                select: [
                    "id", "name", "email", "status", "classes", "createdBy",
                    "section", "branch"
                ]
            });
            if (!found) {
                throw new NotFoundException(`User with ID: ${id} was not found`);
            }
        } catch (err) {
            this.logger.error(err.stack);
            throw new NotFoundException(`User with ID: ${id} was not found`);
        }
        return found;
    }

    async createNewUser(
        createUser: CreateUserDto,
        user: Users
        ): Promise<void> {
        return this.userRepository.newUser(createUser, user);
    }

    async updateNewUser(
        updateUserDto: UpdateUserDto
        ): Promise<void> {
        return this.userRepository.udpateUser(updateUserDto);
    }

    async deleteUser(id: string): Promise<void> {
        try {
            const result = await this.userRepository.delete(id);
    
            if (result.affected === 0) {
                throw new NotFoundException(`User with ID: ${id} was not found`);
            }
        } catch (err) {
            this.logger.error(err.stack);
            throw new NotFoundException(`User with ID: ${id} was not found`);
        }
    }

    async authenticateUser(userAuthDto: UserAuthDto): Promise<{accessToken: string}> {
        const users = await this.userRepository.validateUserPassword(userAuthDto);

        if (!users) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        const { id, name, email } = users;
        const payload: JwtPayload = { 
            id, name, email
         };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }

    async checkIfMasterAdminExistsAndAdd(): Promise<void> {
        const adminUser = await this.userRepository.findOne({
            where: {
                email: 'admin@mca.com'
            }
        });
        if (!adminUser) {
            return await this.createNewUser({
                name: 'Admin', email: 'admin@mca.com', branch: '', classes: '', section: '',
                password: 'mca@123', roles: Roles.ADMIN
            }, null);
        }
    }
}
