import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShareDto {
	@IsOptional()
	@IsUUID(4, { each: true })
	file_id: string;

	@IsOptional()
	@IsUUID(4, { each: true })
	folder_id: string;

	@IsNotEmpty()
	@IsUUID(4, { each: true })
	user_id: string;

	@IsNotEmpty()
	@IsUUID(4, { each: true })
	consumer_id: string;
}
