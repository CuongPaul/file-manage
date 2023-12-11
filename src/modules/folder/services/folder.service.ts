import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import Folder from '../models/folder.model';
import { CreateFolderDto } from '../dto/create-folder.dto';
import { UpdateFolderDto } from '../dto/update-folder.dto';

@Injectable()
export class FolderService {
	constructor(
		@InjectModel(Folder)
		private folderModel: typeof Folder,
	) {}

	create(createFolderDto: CreateFolderDto) {
		return this.folderModel.create({ ...createFolderDto });
	}

	findAll(): Promise<Folder[]> {
		return this.folderModel.findAll();
	}

	findOne(id: string): Promise<Folder | null> {
		return this.folderModel.findOne({ where: { id } });
	}

	update(id: string, updateUserDto: UpdateFolderDto) {
		return this.folderModel.update(updateUserDto, { where: { id } });
	}

	async remove(id: string): Promise<void> {
		await this.folderModel.destroy({ where: { id } });
	}
}
