import { Test, TestingModule } from '@nestjs/testing';

import { SharePermissionService } from './share-permission.service';

describe('SharePermissionService', () => {
	let service: SharePermissionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SharePermissionService],
		}).compile();

		service = module.get<SharePermissionService>(SharePermissionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
