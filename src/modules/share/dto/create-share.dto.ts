import {
	IsEnum,
	IsArray,
	IsNotEmpty,
	IsOptional,
	ArrayMinSize,
} from 'class-validator';

import { SharePermissions } from '../constants/permissions.enum';

export class CreateShareDto {
	@IsOptional()
	file_id: string;

	@IsOptional()
	folder_id: string;

	@IsNotEmpty()
	user_id: string;

	@IsNotEmpty()
	consumer_id: string;

	@IsArray()
	@IsOptional()
	@ArrayMinSize(1)
	@IsEnum(SharePermissions, { each: true })
	permissions: SharePermissions[];
}
