import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import File from '../models/file.model';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';

@Injectable()
export class FileService {
	constructor(
		@InjectModel(File)
		private fileModel: typeof File,
	) {}

	create(createFileDto: CreateFileDto) {
		return this.fileModel.create({ ...createFileDto });
	}

	findAll(): Promise<File[]> {
		return this.fileModel.findAll();
	}

	findOne(id: string): Promise<File | null> {
		return this.fileModel.findOne({ where: { id } });
	}

	update(id: string, updateUserDto: UpdateFileDto) {
		return this.fileModel.update(updateUserDto, { where: { id } });
	}

	async remove(id: string): Promise<void> {
		await this.fileModel.destroy({ where: { id } });
	}
}
