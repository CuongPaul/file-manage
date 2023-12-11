import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '../models/user.models';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User,
	) {}

	create(createUserDto: CreateUserDto) {
		return this.userModel.create({ ...createUserDto });
	}

	findAll(): Promise<User[]> {
		return this.userModel.findAll();
	}

	findOne(id: string): Promise<User | null> {
		return this.userModel.findOne({ where: { id } });
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return this.userModel.update(updateUserDto, { where: { id } });
	}

	async remove(id: string): Promise<void> {
		await this.userModel.destroy({ where: { id } });
	}
}
