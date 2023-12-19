import {
	Inject,
	Injectable,
	ConflictException,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import { pick } from 'lodash';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { SignUpDto } from '../dto/sign-up.dto';
import User from '@modules/user/models/user.model';
import { UserService } from '@modules/user/services/user.service';
import { ERRORS_DICTIONARY } from '@constants/error-dictionary.enum';
import { ITokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class AuthService {
	private SALT_ROUND = 11;

	constructor(
		@Inject(CACHE_MANAGER)
		private cacheManager: Cache,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	async signUp(signUpDto: SignUpDto): Promise<User> {
		const { email, password } = signUpDto;

		const existedEmail = await this.userService.findOneByCondition({ email });
		if (existedEmail) {
			throw new ConflictException('Email đã tồn tại!');
		}

		const hashedPassword = await bcrypt.hash(password, this.SALT_ROUND);

		const user = await this.userService.create({
			...signUpDto,
			password: hashedPassword,
		});
		const data = pick(user, ['id', 'email', 'username']) as User;

		return data;
	}

	async signIn(
		userId: string,
	): Promise<{ access_token: string; refresh_token: string }> {
		const accessToken = this.generateAccessToken({ user_id: userId });
		const refreshToken = this.generateRefreshToken({ user_id: userId });

		const hashedRefreshToken = await bcrypt.hash(refreshToken, this.SALT_ROUND);

		await this.userService.update(userId, {
			refresh_token: hashedRefreshToken,
		});

		return { access_token: accessToken, refresh_token: refreshToken };
	}

	async signOut({
		userId,
		accessToken,
	}: {
		userId: string;
		accessToken: string;
	}): Promise<void> {
		const user = await this.userService.findOneByCondition({ id: userId });
		if (!user) {
			throw new BadRequestException({
				detail: "User doesn't exist",
				message: ERRORS_DICTIONARY.USER_NOT_FOUND,
			});
		}

		await this.cacheManager.set(
			`black_list_access_token:Bearer ${accessToken}`,
			userId,
			0,
		);
		await this.cacheManager.set(
			`black_list_refresh_token:Bearer ${user.refresh_token}`,
			userId,
			0,
		);

		await this.userService.update(userId, { refresh_token: null });
	}

	async getUserAuthenticated({
		email,
		password,
	}: {
		email: string;
		password: string;
	}): Promise<User> {
		const user = await this.userService.findOneByCondition({ email });
		if (!user) throw new NotFoundException();

		await this.verifyPlainContentWithHashedContent({
			plainText: password,
			hashedText: user.password,
		});

		const data = pick(user, ['id', 'email', 'username']) as User;

		return data;
	}

	async getUserForAccessToken(userId: string): Promise<User> {
		const user = await this.userService.findOneByCondition({ id: userId });
		if (!user) {
			throw new BadRequestException({
				detail: "User doesn't exist",
				message: ERRORS_DICTIONARY.USER_NOT_FOUND,
			});
		}

		const data = pick(user, ['id', 'email', 'username']) as User;

		return data;
	}

	async getUserForRefreshToken({
		userId,
		refreshToken,
	}: {
		userId: string;
		refreshToken: string;
	}): Promise<User> {
		const user = await this.userService.findOneByCondition({ id: userId });
		if (!user) throw new NotFoundException();

		await this.verifyPlainContentWithHashedContent({
			plainText: refreshToken,
			hashedText: user.refresh_token,
		});

		const data = pick(user, ['id', 'email', 'username']) as User;

		return data;
	}

	private async verifyPlainContentWithHashedContent({
		plainText,
		hashedText,
	}: {
		plainText: string;
		hashedText: string;
	}) {
		const isMatching = await bcrypt.compare(plainText, hashedText);

		if (!isMatching) throw new BadRequestException();
	}

	generateAccessToken(payload: ITokenPayload) {
		return this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
			expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
		});
	}

	generateRefreshToken(payload: ITokenPayload) {
		return this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
			expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
		});
	}
}
