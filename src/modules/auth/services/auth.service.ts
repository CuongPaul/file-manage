import {
	Injectable,
	ConflictException,
	BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { SignUpDto } from '../dto/sign-up.dto';
import User from '@modules/user/models/user.model';
import { UserService } from '@modules/user/services/user.service';

@Injectable()
export class AuthService {
	private SALT_ROUND = 11;

	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	async signUp(signUpDto: SignUpDto): Promise<void> {
		const { email, password } = signUpDto;

		const existedEmail = await this.userService.findOneByCondition({ email });
		if (existedEmail) {
			throw new ConflictException('Email đã tồn tại!');
		}

		const hashedPassword = await bcrypt.hash(password, this.SALT_ROUND);
		await this.userService.create({
			...signUpDto,
			password: hashedPassword,
		});
	}

	async signIn(
		userId: string,
	): Promise<{ access_token: string; refresh_token: string }> {
		const accessToken = this.jwtService.sign(
			{ user_id: userId },
			{
				secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
				expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
			},
		);
		const refreshToken = this.jwtService.sign(
			{ user_id: userId },
			{
				secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
				expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
			},
		);

		const hashedRefreshToken = await bcrypt.hash(refreshToken, this.SALT_ROUND);
		await this.userService.setRefreshToken(userId, hashedRefreshToken);

		return { access_token: accessToken, refresh_token: refreshToken };
	}

	async getAuthenticatedUser({
		email,
		password,
	}: {
		email: string;
		password: string;
	}): Promise<User> {
		const user = await this.userService.findOneByCondition({ email });
		if (!user) {
			throw new BadRequestException('Thông tin đăng nhập không chính xác!');
		}

		const isMatchingPassword = await bcrypt.compare(password, user.password);
		if (!isMatchingPassword) {
			throw new BadRequestException('Thông tin đăng nhập không chính xác!');
		}

		return user;
	}
}
