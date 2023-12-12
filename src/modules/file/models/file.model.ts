import {
	Model,
	Table,
	Column,
	Default,
	DataType,
	BelongsTo,
	AllowNull,
	ForeignKey,
	PrimaryKey,
} from 'sequelize-typescript';

import User from '@modules/user/models/user.model';
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

	@ForeignKey(() => Folder)
	@Column({ type: DataType.UUID })
	folder_id: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	url: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	name: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	type: string;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column({ type: DataType.UUID })
	user_id: string;

	@BelongsTo(() => Folder)
	folder: Folder;

	@BelongsTo(() => User)
	user: User;
}
