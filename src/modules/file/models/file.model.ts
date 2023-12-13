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
import Share from '@modules/share/models/share.model';
import Folder from '@modules/folder/models/folder.model';

@Table({
	tableName: 'file',
	createdAt: 'created_at',
	updatedAt: 'updated_at',
})
export default class File extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column({ type: DataType.UUID })
	id: string;

	@Column({ type: DataType.INTEGER })
	size: number;

	@Column({ type: DataType.STRING })
	name: string;

	@Column({ type: DataType.STRING })
	type: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.UUID })
	user_id: string;

	@ForeignKey(() => Folder)
	@Column({ type: DataType.UUID })
	folder_id: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	url: string;

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Folder)
	folder: Folder;

	@HasMany(() => Share, { onDelete: 'SET NULL', foreignKey: 'file_id' })
	shares: Share[];
}
