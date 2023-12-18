import { pick } from 'lodash';
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

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = await this.userModel.create({ ...createUserDto });

		const data = pick(user, ['id', 'email', 'username']) as User;

		return data;
	}

	async findOneByCondition(condition: {
		id?: string;
		email?: string;
		username?: string;
	}): Promise<User | null> {
		const user = await this.userModel.findOne({ where: condition });

		return user;
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
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

	async setRefreshToken(
		id: string,
		hashed_refresh_token: string,
	): Promise<void> {
		const user = await this.userModel.findOne({ where: { id } });

		if (!user) {
			throw new BadRequestException({
				detail: "User doesn't exist",
				message: ERRORS_DICTIONARY.USER_NOT_FOUND,
			});
		}

		await user.update({ refresh_token: hashed_refresh_token });
	}
}
