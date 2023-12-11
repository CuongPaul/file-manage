import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFolderDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	user_id: string;

	@IsOptional()
	parent_folder_id: string;
}
