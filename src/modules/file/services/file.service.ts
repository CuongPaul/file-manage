import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException } from '@nestjs/common';

import File from '../models/file.model';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { ERRORS_DICTIONARY } from '@constants/error-dictionary.enum';

@Injectable()
export class FileService {
	constructor(
		@InjectModel(File)
		private fileModel: typeof File,
	) {}

	create(
		url: string,
		size: number,
		name: string,
		type: string,
		createFileDto: CreateFileDto,
	) {
		return this.fileModel.create({ url, size, name, type, ...createFileDto });
	}

	findAll(): Promise<File[]> {
		return this.fileModel.findAll();
	}

	findOne(id: string): Promise<File | null> {
		return this.fileModel.findOne({ where: { id } });
	}

	async update(id: string, updateFileDto: UpdateFileDto) {
		const file = await this.fileModel.findOne({ where: { id } });

		if (!file) {
			throw new BadRequestException({
				detail: "File doesn't exist",
				message: ERRORS_DICTIONARY.FILE_NOT_FOUND,
			});
		}

		return file.update(updateFileDto);
	}

	async remove(id: string): Promise<void> {
		const file = await this.fileModel.findOne({ where: { id } });

		if (!file) {
			throw new BadRequestException({
				detail: "File doesn't exist",
				message: ERRORS_DICTIONARY.FILE_NOT_FOUND,
			});
		}

		await file.destroy();
	}
}
