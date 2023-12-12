import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateShareDto } from './create-share.dto';

export class UpdateShareDto extends PartialType(
	OmitType(CreateShareDto, ['item_id', 'user_id', 'consumer_id', 'item_type']),
) {}
