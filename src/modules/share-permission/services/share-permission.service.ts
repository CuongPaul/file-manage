import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import SharePermission from '../models/share-permission.model';
import { CreateSharePermissionDto } from '../dto/create-share-permission.dto';
import { UpdateSharePermissionDto } from '../dto/update-share-permission.dto';

@Injectable()
export class SharePermissionService {
	constructor(
		@InjectModel(SharePermission)
		private sharePermissionModel: typeof SharePermission,
	) {}

	create(createSharePermissionDto: CreateSharePermissionDto) {
		return this.sharePermissionModel.create({ ...createSharePermissionDto });
	}

	findAll(): Promise<SharePermission[]> {
		return this.sharePermissionModel.findAll();
	}

	findOne(id: string): Promise<SharePermission | null> {
		return this.sharePermissionModel.findOne({ where: { id } });
	}

	update(id: string, updateSharePermissionDto: UpdateSharePermissionDto) {
		return this.sharePermissionModel.update(updateSharePermissionDto, {
			where: { id },
		});
	}

	async remove(id: string): Promise<void> {
		await this.sharePermissionModel.destroy({ where: { id } });
	}
}
