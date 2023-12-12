import { SharePermissions } from '../constants/permissions.enum';

export interface IShare {
	id: string;
	file_id?: string;
	user_id?: string;
	folder_id?: string;
	consumer_id: string;
	permissions: SharePermissions[];
}
