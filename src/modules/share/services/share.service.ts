import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import Share from '../models/share.model';
import { CreateShareDto } from '../dto/create-share.dto';
import { UpdateShareDto } from '../dto/update-share.dto';

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

	update(id: string, updateShareDto: UpdateShareDto) {
		return this.shareModel.update(updateShareDto, { where: { id } });
	}

	async remove(id: string): Promise<void> {
		await this.shareModel.destroy({ where: { id } });
	}
}
