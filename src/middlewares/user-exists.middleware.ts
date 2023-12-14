import {
	Injectable,
	NestMiddleware,
	BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import User from '@modules/user/models/user.model';
import { ERRORS_DICTIONARY } from '@constants/error-dictionary.enum';

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
	async use(req: Request, _res: Response, next: NextFunction) {
		const userId = req.headers['user-id'];

		if (userId) {
			const user = await User.findOne({ where: { id: userId } });

			if (!user) {
				throw new BadRequestException({
					detail: "User doesn't exist",
					message: ERRORS_DICTIONARY.USER_NOT_FOUND,
				});
			}
		}

		next();
	}
}
