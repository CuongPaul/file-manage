import { InjectModel } from '@nestjs/sequelize';
import { Injectable, BadRequestException } from '@nestjs/common';

import Share from '../models/share.model';
import { CreateShareDto } from '../dto/create-share.dto';
import { UpdateShareDto } from '../dto/update-share.dto';
import { ERRORS_DICTIONARY } from '@constants/error-dictionary.enum';

@Injectable()
export class ShareService {
	constructor(
		@InjectModel(Share)
		private shareModel: typeof Share,
	) {}

	create(createShareDto: CreateShareDto) {
		return this.shareModel.create({ ...createShareDto });
	}

	findAll(): Promise<Share[]> {
		return this.shareModel.findAll();
	}

	findOne(id: string): Promise<Share | null> {
		return this.shareModel.findOne({ where: { id } });
	}

	async update(id: string, updateShareDto: UpdateShareDto) {
		const share = await this.shareModel.findOne({ where: { id } });

		if (!share) {
			throw new BadRequestException({
				detail: "Share doesn't exist",
				message: ERRORS_DICTIONARY.SHARE_NOT_FOUND,
			});
		}

		return share.update(updateShareDto);
	}

	async remove(id: string): Promise<void> {
		const share = await this.shareModel.findOne({ where: { id } });

		if (!share) {
			throw new BadRequestException({
				detail: "Share doesn't exist",
				message: ERRORS_DICTIONARY.SHARE_NOT_FOUND,
			});
		}

		await share.destroy();
	}
}
