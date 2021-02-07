import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schemas';
import { Model } from 'mongoose';
import { createUserDto } from 'src/user/dto/create-user.dto'
import { PaginationQueryDto } from 'src/dto/pagination-query.dto'

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) { }

    /**
     * 创建用户接口
     * @param createUserDto 
     */
    async create(createUserDto: createUserDto): Promise<User> {
        console.log(createUserDto);
        const createUser = new this.userModel(createUserDto);
        return createUser.save();
    }

    /**
     * 查询用户数据接口支持分页
     * @param paginationQuery 
     */
    async findAll(
        paginationQuery: PaginationQueryDto,
    ): Promise<User[]> {
        const { pageSize, pageIndex } = paginationQuery;
        return this.userModel.find()
        .skip(Number(pageSize) * Number(pageIndex))
        .limit(Number(pageSize))
        .exec();
    }

    /**
     * 根据用户id查询用户
     * @param _id 
     */
    async findUserById(_id: string): Promise<User> {
        const user = await this.userModel.findById({_id: _id});
        if (!user) {
            throw new NotFoundException(`User #${_id} not found`);
          }
      
          return user;
    }

    /**
     * 更新用户数信息
     * @param _id 
     * @param updateUserDto 
     */
    async updateUser(
        _id: string,
        updateUserDto: createUserDto
    ): Promise<User> {
        const existingUser = await this.userModel.findByIdAndUpdate(
            { _id: _id },
            updateUserDto,
          );
          if (!existingUser) {
            throw new NotFoundException(`User #${_id} not found`);
          }
      
          return existingUser;
    }

    /**
     * 查询用户信息
     * @param _id 
     */
    async deleteUser(_id: string): Promise<any> {
        const deletedCustomer = await this.userModel.findByIdAndRemove(
            _id,
          );
          return deletedCustomer;
    }


}
