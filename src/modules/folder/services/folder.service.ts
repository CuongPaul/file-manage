import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException } from '@nestjs/common';

import Folder from '../models/folder.model';
import { CreateFolderDto } from '../dto/create-folder.dto';
import { UpdateFolderDto } from '../dto/update-folder.dto';
import { ERRORS_DICTIONARY } from '@constants/error-dictionary.enum';

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

	async update(id: string, updateFolderDto: UpdateFolderDto) {
		const folder = await this.folderModel.findOne({ where: { id } });

		if (!folder) {
			throw new BadRequestException({
				detail: "Folder doesn't exist",
				message: ERRORS_DICTIONARY.FOLDER_NOT_FOUND,
			});
		}

		return folder.update(updateFolderDto);
	}

	async remove(id: string): Promise<void> {
		const folder = await this.folderModel.findOne({ where: { id } });

		if (!folder) {
			throw new BadRequestException({
				detail: "Folder doesn't exist",
				message: ERRORS_DICTIONARY.FOLDER_NOT_FOUND,
			});
		}

		await folder.destroy();
	}
}
