import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFolderDto {
	@IsNotEmpty()
	@IsUUID(4, { each: true })
	user_id: string;

	@IsOptional()
	@IsUUID(4, { each: true })
	parent_folder_id: string;

	@IsNotEmpty()
	name: string;
}
