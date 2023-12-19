import {
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Controller,
} from '@nestjs/common';
import { pick } from 'lodash';
import { ApiTags } from '@nestjs/swagger';

import User from '../models/user.model';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAccessTokenGuard } from '@guards/jwt-access-token.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAccessTokenGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const user = await this.userService.findOneByCondition({ id });

		const data = pick(user, ['id', 'email', 'username']) as User;

		return data;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		const user = await this.userService.update(id, updateUserDto);

		const data = pick(user, ['id', 'email', 'username']) as User;

		return data;
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
