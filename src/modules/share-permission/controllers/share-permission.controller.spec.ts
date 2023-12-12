import { Test, TestingModule } from '@nestjs/testing';

import { SharePermissionController } from './share-permission.controller';
import { SharePermissionService } from '../services/share-permission.service';

describe('SharePermissionController', () => {
	let controller: SharePermissionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SharePermissionController],
			providers: [SharePermissionService],
		}).compile();

		controller = module.get<SharePermissionController>(
			SharePermissionController,
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
