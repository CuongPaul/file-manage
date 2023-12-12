import {
	Model,
	Table,
	Column,
	Default,
	DataType,
	AllowNull,
	BelongsTo,
	ForeignKey,
	PrimaryKey,
} from 'sequelize-typescript';

import User from '@modules/user/models/user.model';
import File from '@modules/file/models/file.model';
import Folder from '@modules/folder/models/folder.model';
import { ShareType, SharePermissions } from '../constants/permissions.enum';

@Table({
	tableName: 'share',
	createdAt: 'created_at',
	updatedAt: 'updated_at',
})
export default class Share extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column({ type: DataType.UUID })
	id: string;

	@AllowNull(false)
	@ForeignKey(() => File)
	@ForeignKey(() => Folder)
	@Column({ type: DataType.UUID })
	item_id: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.UUID })
	user_id: string;

	@AllowNull(false)
	@Column({ type: DataType.UUID })
	consumer_id: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	item_type: ShareType;

	@AllowNull(false)
	@Column({ type: DataType.ARRAY(DataType.STRING) })
	permissions: SharePermissions[];

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Folder)
	folder: Folder;

	@BelongsTo(() => File)
	file: File;
}
