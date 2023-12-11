import { Injectable } from '@nestjs/common';

import { FolderEntity } from '../entities/folder.entity';
import { CreateFolderDto } from '../dto/create-folder.dto';
import { UpdateFolderDto } from '../dto/update-folder.dto';
import { FolderRepository } from '../repositories/folder.repository';

@Injectable()
export class FolderService {
	constructor(private readonly folderRepository: FolderRepository) {}

	create(createFolderDto: CreateFolderDto) {
		return this.folderRepository.save(createFolderDto);
	}

	findAll(): Promise<FolderEntity[]> {
		return this.folderRepository.find();
	}

	findOne(id: string): Promise<FolderEntity | null> {
		return this.folderRepository.findOneBy({ id });
	}

	update(id: string, updateUserDto: UpdateFolderDto) {
		return this.folderRepository.update(id, updateUserDto);
	}

	async remove(id: string): Promise<void> {
		await this.folderRepository.delete(id);
	}
}
