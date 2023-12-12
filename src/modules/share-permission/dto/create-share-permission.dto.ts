import { IsUUID, IsEnum, IsNotEmpty } from 'class-validator';

import { SharePermissions } from '../constants/permissions.enum';

export class CreateSharePermissionDto {
	@IsNotEmpty()
	@IsUUID(4, { each: true })
	share_id: string;

	@IsNotEmpty()
	@IsEnum(SharePermissions)
	permission: SharePermissions;
}
