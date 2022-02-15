import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDAO } from 'src/types/dao/create-user.dao';
import { UserTable } from 'src/types/tables/user.table';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUser: CreateUserDAO): Promise<UserTable> {
    const createdUser = new this.userModel({
      ...createUser,
    });
    return createdUser.save();
  }

  async findUser(email: string): Promise<UserTable> {
    return this.userModel.findOne({ email });
  }
}
