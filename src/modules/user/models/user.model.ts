import {
	Model,
	Table,
	Column,
	Default,
	HasMany,
	DataType,
	PrimaryKey,
	AllowNull,
} from 'sequelize-typescript';

import Folder from '@modules/folder/models/folder.model';

@Table({
	tableName: 'user',
	createdAt: 'created_at',
	updatedAt: 'updated_at',
})
export default class User extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column({ type: DataType.UUID })
	id: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	username: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	email: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	password: string;

	@HasMany(() => Folder, { onDelete: 'CASCADE' })
	folders: Folder[];
}
