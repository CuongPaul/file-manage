import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException } from '@nestjs/common';

import User from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ERRORS_DICTIONARY } from '@constants/error-dictionary.enum';

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

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.userModel.findOne({ where: { id } });

		if (!user) {
			throw new BadRequestException({
				detail: "User doesn't exist",
				message: ERRORS_DICTIONARY.USER_NOT_FOUND,
			});
		}

		return user.update(updateUserDto);
	}

	async remove(id: string): Promise<void> {
		const user = await this.userModel.findOne({ where: { id } });

		if (!user) {
			throw new BadRequestException({
				detail: "User doesn't exist",
				message: ERRORS_DICTIONARY.USER_NOT_FOUND,
			});
		}

		await user.destroy();
	}
}
