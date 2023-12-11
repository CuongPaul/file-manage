import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FolderEntity } from '@modules/folder/entities/folder.entity';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(() => FolderEntity, (folder) => folder.user, { cascade: true })
	folders: FolderEntity[];
}
