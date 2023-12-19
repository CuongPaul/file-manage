import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import User from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User,
	) {}

	create(createUserDto: CreateUserDto): Promise<User> {
		return this.userModel.create({ ...createUserDto });
	}

	findOneByCondition(condition: {
		id?: string;
		email?: string;
	}): Promise<User | null> {
		return this.userModel.findOne({ where: condition });
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.userModel.findOne({ where: { id } });

		return user.update(updateUserDto);
	}

	async remove(id: string): Promise<void> {
		const user = await this.userModel.findOne({ where: { id } });

		await user.destroy();
	}
}
