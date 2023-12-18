import {
	Get,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAccessTokenGuard } from '@guards/jwt-access-token.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAccessTokenGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOneByCondition({ id });
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
