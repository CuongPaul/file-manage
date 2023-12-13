import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFileDto {
	@IsOptional()
	name: string;

	@IsNotEmpty()
	@IsUUID(4, { each: true })
	user_id: string;

	@IsOptional()
	@IsUUID(4, { each: true })
	folder_id: string;
}
