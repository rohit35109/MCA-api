import { Controller, Get, Param, Post, Body, ValidationPipe, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/get-user.decorator';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
    constructor(private _userService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard())
    getAllUsers(): Promise<Users[]> {
        return this._userService.getAllUsers();
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    getUserByID(
        @Param('id') id: string
    ): Promise<Users> {
        return this._userService.getUserById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    saveNewUser(@Body(ValidationPipe) userDto: CreateUserDto): Promise<void> {
        return this._userService.createNewUser(userDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteUser(@Param('id') id: string): Promise<void> {
        return this._userService.deleteUser(id);
    }

    @Post('/authenticate')
    authenticateUser(@Body(ValidationPipe) userAuthDto: UserAuthDto): Promise<{accessToken: string}> {
        return this._userService.authenticateUser(userAuthDto);
    }

}
