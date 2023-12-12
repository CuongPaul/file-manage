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

import { ShareService } from '../services/share.service';
import { CreateShareDto } from '../dto/create-share.dto';
import { UpdateShareDto } from '../dto/update-share.dto';

@ApiTags('Share')
@Controller('share')
export class ShareController {
	constructor(private readonly shareService: ShareService) {}

	@Post()
	create(@Body() createShareDto: CreateShareDto) {
		return this.shareService.create(createShareDto);
	}

	@Get()
	findAll() {
		return this.shareService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.shareService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFolderDto: UpdateShareDto) {
		return this.shareService.update(id, updateFolderDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.shareService.remove(id);
	}
}
