import { Controller, Get, Param, Post, Body, ValidationPipe, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/get-user.decorator';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private _userService: UsersService) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async getAllUsers(): Promise<Users[]> {
        return this._userService.getAllUsers();
    }

    @Get('/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async getUserByID(
        @Param('id') id: string
    ): Promise<Users> {
        return this._userService.getUserById(id);
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async saveNewUser(
        @Body(ValidationPipe) userDto: CreateUserDto,
        @GetUser() user: Users
        ): Promise<void> {
        return this._userService.createNewUser(userDto, user);
    }

    @Put()
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async updateUser(
        @Body(ValidationPipe) updateUser: UpdateUserDto,
        ): Promise<void> {
        return this._userService.updateNewUser(updateUser);
    }

    @Delete('/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this._userService.deleteUser(id);
    }

    @Post('/authenticate')
    async authenticateUser(@Body(ValidationPipe) userAuthDto: UserAuthDto): Promise<{accessToken: string}> {
        return this._userService.authenticateUser(userAuthDto);
    }

}
