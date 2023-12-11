import { Injectable } from '@nestjs/common';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	create(createUserDto: CreateUserDto) {
		return this.userRepository.save(createUserDto);
	}

	findAll(): Promise<UserEntity[]> {
		return this.userRepository.find();
	}

	findOne(id: string): Promise<UserEntity | null> {
		return this.userRepository.findOneBy({ id });
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return this.userRepository.update(id, updateUserDto);
	}

	async remove(id: string): Promise<void> {
		await this.userRepository.delete(id);
	}
}
