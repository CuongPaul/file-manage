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

import User from '@modules/user/models/user.models';

@Table({
	tableName: 'folder',
	createdAt: 'created_at',
	updatedAt: 'updated_at',
})
export default class Folder extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column({ type: DataType.UUID })
	id: string;

	@Column({ type: DataType.UUID })
	parent_folder_id: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	name: boolean;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column({ type: DataType.UUID })
	user_id: string;

	@BelongsTo(() => User)
	user: User;
}
