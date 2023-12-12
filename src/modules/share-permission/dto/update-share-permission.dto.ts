import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateSharePermissionDto } from './create-share-permission.dto';

export class UpdateSharePermissionDto extends PartialType(
	OmitType(CreateSharePermissionDto, ['share_id']),
) {}
