import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException } from '@nestjs/common';

import Folder from '../models/folder.model';
import { QueryFoldersDto } from '../dto/get-folders.dto';
import { CreateFolderDto } from '../dto/create-folder.dto';
import { UpdateFolderDto } from '../dto/update-folder.dto';
import { ERRORS_DICTIONARY } from '@constants/error-dictionary.enum';

@Injectable()
export class FolderService {
	constructor(
		@InjectModel(Folder)
		private folderModel: typeof Folder,
	) {}

	async create(createFolderDto: CreateFolderDto) {
		const { parent_folder_id } = createFolderDto;

		if (parent_folder_id) {
			const parentFolder = await this.folderModel.findOne({
				where: { id: parent_folder_id },
			});
			if (!parentFolder) {
				throw new BadRequestException({
					detail: "Folder doesn't exist",
					message: ERRORS_DICTIONARY.FOLDER_NOT_FOUND,
				});
			}
		}

		return this.folderModel.create({ ...createFolderDto });
	}

	findAll(queryFolders: QueryFoldersDto) {
		return this.folderModel.findAll({ where: { ...queryFolders } });
	}

	async findOne(id: string, user_id: string) {
		return this.folderModel.findOne({ where: { id, user_id } });
	}

	async update(id: string, user_id: string, updateFolderDto: UpdateFolderDto) {
		if (updateFolderDto.parent_folder_id) {
			const parent_folder = await this.folderModel.findOne({
				where: { id: updateFolderDto.parent_folder_id },
			});
			if (!parent_folder) {
				throw new BadRequestException({
					detail: "Folder doesn't exist",
					message: ERRORS_DICTIONARY.FOLDER_NOT_FOUND,
				});
			}
		}

		const folder = await this.folderModel.findOne({ where: { id } });
		if (!folder) {
			throw new BadRequestException({
				detail: "Folder doesn't exist",
				message: ERRORS_DICTIONARY.FOLDER_NOT_FOUND,
			});
		}

		return folder.update(updateFolderDto);
	}

	async remove(id: string) {
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
