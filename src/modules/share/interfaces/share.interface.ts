import { Permission } from '@shared/constants/permissions.enum';

export interface IShare {
	id: string;
	user_id?: string;
	file_id?: string;
	folder_id?: string;
	consumer_id?: string;
	permissions: Permission[];
}
