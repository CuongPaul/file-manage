import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends PartialType(
	OmitType(CreateFileDto, ['user_id']),
) {}
