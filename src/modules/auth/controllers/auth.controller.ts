import { Req, Body, Post, UseGuards, Controller } from '@nestjs/common';

import { SignUpDto } from '../dto/sign-up.dto';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '@guards/local-auth.guard';
import { JwtAccessTokenGuard } from '@guards/jwt-access-token.guard';
import { JwtRefreshTokenGuard } from '@guards/jwt-refresh-token.guard';
import { IRequestWithUser } from '../interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-up')
	signUp(@Body() signUpDto: SignUpDto) {
		return this.authService.signUp(signUpDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	signIn(@Req() request: IRequestWithUser) {
		return this.authService.signIn(request.user.id);
	}

	@UseGuards(JwtAccessTokenGuard)
	@Post('sign-out')
	signOut(@Req() request: IRequestWithUser) {
		const userId = request.user.id;
		const accessToken = request.headers.authorization.split('Bearer ')[1];

		return this.authService.signOut({ userId, accessToken });
	}

	@UseGuards(JwtRefreshTokenGuard)
	@Post('refresh-access-token')
	refreshAccessToken(@Req() request: IRequestWithUser) {
		return this.authService.generateAccessToken({
			user_id: request.user.id,
		});
	}
}
