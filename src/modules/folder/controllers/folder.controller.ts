import {
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FolderService } from '../services/folder.service';
import { CreateFolderDto } from '../dto/create-folder.dto';
import { UpdateFolderDto } from '../dto/update-folder.dto';

@ApiTags('Folder')
@Controller('folder')
export class FolderController {
	constructor(private readonly folderService: FolderService) {}

	@Post()
	create(@Body() createFolderDto: CreateFolderDto) {
		return this.folderService.create(createFolderDto);
	}

	@Get()
	findAll() {
		return this.folderService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.folderService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
		return this.folderService.update(id, updateFolderDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.folderService.remove(id);
	}
}
