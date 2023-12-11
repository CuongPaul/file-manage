import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '@modules/user/entities/user.entity';

@Entity('folder')
export class FolderEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: true })
	parent_folder_id: string;

	@Column()
	name: string;

	@Column()
	user_id: string;

	@ManyToOne(() => UserEntity, (user) => user.folders)
	user: UserEntity;
}
