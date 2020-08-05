/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Param, ParseIntPipe, Post, Body, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private _userService: UsersService) {}

    @Get()
    getAllUsers(): Promise<Users[]> {
        return this._userService.getAllUsers();
    }

    @Get('/:id')
    getUserByID(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Users> {
        return this._userService.getUserById(id);
    }

    @Post()
    saveNewUser(@Body(ValidationPipe) userDto: CreateUserDto): Promise<void> {
        return this._userService.createNewUser(userDto);
    }

}
