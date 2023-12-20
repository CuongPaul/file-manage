import {
	Inject,
	HttpStatus,
	Injectable,
	HttpException,
	NestMiddleware,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BlackListRefreshTokenMiddleware implements NestMiddleware {
	constructor(
		@Inject(CACHE_MANAGER)
		private cacheManager: Cache,
	) {}

	async use(req: Request, _res: Response, next: NextFunction) {
		const refreshToken = req.headers.authorization.split('Bearer ')[1];

		if (refreshToken) {
			const isBlackList = await this.cacheManager.get(
				`black_list_refresh_token: ${refreshToken}`,
			);

			if (isBlackList) {
				throw new HttpException('Refresh token invalid', HttpStatus.FORBIDDEN);
			}
		}

		next();
	}
}
