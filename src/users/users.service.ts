import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository
    ) {}

    async getAllUsers(): Promise<Users[]> {
        return await this.userRepository.find({
            select: ["id", "name", "email", "status"]
        });
    }

    async getUserById(id: number): Promise<Users> {
        const found = await this.userRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`User with ID: ${id} was not found`);
        }
        return found;
    }

    async createNewUser(createUser: CreateUserDto): Promise<void> {
        return this.userRepository.newUser(createUser);
    }
}
