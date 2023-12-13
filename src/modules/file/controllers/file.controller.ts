import {
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Controller,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from '../services/file.service';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { S3Service } from '@modules/s3/services/s3.service';

@ApiTags('File')
@Controller('file')
export class FileController {
	constructor(
		private readonly s3Service: S3Service,
		private readonly fileService: FileService,
		private readonly configService: ConfigService,
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('file_upload'))
	async create(
		@Body() createFileDto: CreateFileDto,
		@UploadedFile() fileUpload: Express.Multer.File,
	) {
		const fileUrl = await this.s3Service.uploadFile(
			`common/${fileUpload.originalname}`,
			this.configService.get('AWS_S3_BUCKET_NAME'),
			fileUpload,
		);

		return this.fileService.create(fileUrl, { ...createFileDto });
	}

	@Get()
	findAll() {
		return this.fileService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.fileService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
		return this.fileService.update(id, updateFileDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.fileService.remove(id);
	}
}
