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

import File from '@modules/file/models/file.model';
import Share from '@modules/share/models/share.model';
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

	@HasMany(() => Folder, {
		foreignKey: 'user_id',
	})
	folders: Folder[];

	@HasMany(() => File, {
		foreignKey: 'user_id',
	})
	files: File[];

	@HasMany(() => Share, {
		foreignKey: 'user_id',
	})
	shares: Share[];
}
