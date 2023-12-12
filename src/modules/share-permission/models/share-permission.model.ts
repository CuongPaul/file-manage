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

import Share from '@modules/share/models/share.model';
import { SharePermissions } from '../constants/permissions.enum';

@Table({
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	tableName: 'share-permission',
})
export default class SharePermission extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column({ type: DataType.UUID })
	id: string;

	@AllowNull(false)
	@ForeignKey(() => Share)
	@Column({ type: DataType.UUID })
	share_id: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	permission: SharePermissions;

	@BelongsTo(() => Share)
	share: Share;
}
