import {
	Model,
	Table,
	Column,
	Default,
	HasMany,
	DataType,
	AllowNull,
	BelongsTo,
	ForeignKey,
	PrimaryKey,
} from 'sequelize-typescript';

import User from '@modules/user/models/user.model';
import File from '@modules/file/models/file.model';
import Folder from '@modules/folder/models/folder.model';
import SharePermission from '@modules/share-permission/models/share-permission.model';

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

	@ForeignKey(() => File)
	@Column({ type: DataType.UUID })
	file_id: string;

	@ForeignKey(() => Folder)
	@Column({ type: DataType.UUID })
	folder_id: string;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column({ type: DataType.UUID })
	user_id: string;

	@AllowNull(false)
	@Column({ type: DataType.UUID })
	consumer_id: string;

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Folder)
	folder: Folder;

	@BelongsTo(() => File)
	file: File;

	@HasMany(() => SharePermission, { foreignKey: 'share_id' })
	share_permissions: SharePermission[];
}
