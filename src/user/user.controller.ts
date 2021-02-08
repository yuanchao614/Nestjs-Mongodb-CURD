import { Controller, Get, Post, Body, Query, Res, Param, NotFoundException, HttpStatus, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service'
import { createUserDto } from 'src/user/dto/create-user.dto'
import { PaginationQueryDto } from 'src/dto/pagination-query.dto'
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async createUser(
        @Res() res,
        @Body() createUserDto: createUserDto,
        ) {
        console.log(createUserDto, 'create user param::::::::::::::');
        const user = await this.userService.create(createUserDto);
        return res.status(HttpStatus.OK).json(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async getUser(
        @Res() res,
        @Query() paginationQuery: PaginationQueryDto,
    ) {
        console.log(paginationQuery, 'query user by pagination::::::::::::');
        const userList = await this.userService.findAll(paginationQuery);
        return res.status(HttpStatus.OK).json(userList);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    public async findUserById(@Res() res, @Param('id') userId: string) {
        console.log(userId, 'query user by id:::::::::::');
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('user does not exist!');
      }
      return res.status(HttpStatus.OK).json(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    public async updateUser(
      @Res() res,
      @Param('id') userId: string,
      @Body() updateUserDto: createUserDto,
    ) {
        console.log(userId, updateUserDto, 'update user param:::::::::::::');
      try {
        const user = await this.userService.updateUser(
            userId,
            updateUserDto,
        );
        if (!user) {
          throw new NotFoundException('user does not exist!');
        }
        return res.status(HttpStatus.OK).json({
          message: 'user has been successfully updated',
          user,
        });
      } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error: user not updated!',
          status: 400,
        });
      }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    public async deleteCustomer(@Res() res, @Param('id') userId: string) {
      console.log(userId, 'delete user param:::::::::::::');
      if (!userId) {
        throw new NotFoundException('user ID does not exist');
      }
  
      const user = await this.userService.deleteUser(userId);
  
      if (!user) {
        throw new NotFoundException('user does not exist');
      }
  
      return res.status(HttpStatus.OK).json({
        message: 'user has been deleted',
        user,
      });
    }

}
