import {
	IsEnum,
	IsArray,
	IsNotEmpty,
	IsOptional,
	ArrayMinSize,
} from 'class-validator';

import { ShareType, SharePermissions } from '../constants/permissions.enum';

export class CreateShareDto {
	@IsNotEmpty()
	item_id: string;

	@IsNotEmpty()
	user_id: string;

	@IsNotEmpty()
	consumer_id: string;

	@IsNotEmpty()
	@IsEnum(ShareType)
	item_type: ShareType;

	@IsArray()
	@IsOptional()
	@ArrayMinSize(1)
	@IsEnum(SharePermissions, { each: true })
	permissions: SharePermissions[];
}
