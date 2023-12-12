import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFolderDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	@IsUUID(4, { each: true })
	user_id: string;

	@IsOptional()
	@IsUUID(4, { each: true })
	parent_folder_id: string;
}
