import { pick } from 'lodash';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import User from '@modules/user/models/user.model';
import { UserService } from '@modules/user/services/user.service';
import { ITokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
		});
	}

	async validate(payload: ITokenPayload) {
		const user = await this.userService.findOneByCondition({
			id: payload.user_id,
		});

		const data = pick(user, ['id', 'email', 'username']) as User;

		return data;
	}
}
