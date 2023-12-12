import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFileDto {
	@IsOptional()
	size: string;

	@IsOptional()
	folder_id: string;

	@IsNotEmpty()
	url: string;

	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	type: string;

	user_id: string;
}
