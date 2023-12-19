import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { ROLES } from '@decorators/Roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly refector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.refector.getAllAndOverride(ROLES, [
			context.getHandler(),
			context.getClass(),
		]);

		const request = context.switchToHttp().getRequest();

		return roles.includes(request.user.role);
	}
}
