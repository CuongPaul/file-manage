import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFileDto {
	@IsOptional()
	size: string;

	@IsOptional()
	@IsUUID(4, { each: true })
	folder_id: string;

	@IsNotEmpty()
	url: string;

	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	type: string;

	@IsNotEmpty()
	@IsUUID(4, { each: true })
	user_id: string;
}
