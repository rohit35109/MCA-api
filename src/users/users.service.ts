import { Injectable, NotFoundException, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class UsersService {
    private logger = new Logger('User Service');
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async getAllUsers(): Promise<Users[]> {
        return await this.userRepository.find({
            select: ["id", "name", "email", "status"]
        });
    }

    async getUserById(id: string): Promise<Users> {
        let found = null
        try {
            found = await this.userRepository.findOne(id);
            if (!found) {
                throw new NotFoundException(`User with ID: ${id} was not found`);
            }
        } catch (err) {
            this.logger.error(err.stack);
            throw new NotFoundException(`User with ID: ${id} was not found`);
        }
        return found;
    }

    async createNewUser(createUser: CreateUserDto): Promise<void> {
        return this.userRepository.newUser(createUser);
    }

    async deleteUser(id: string): Promise<void> {
        try {
            const result = await this.userRepository.delete({
                id
            });
    
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
}
