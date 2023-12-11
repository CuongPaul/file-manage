import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
	const logger = new Logger(bootstrap.name);

	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	const port = configService.get('API_PORT');

	await app.listen(port, () => logger.log(`Listening on port ${port}`));
}

bootstrap();
