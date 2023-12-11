import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EnvModule } from './modules/env/env.module';
import { UserModule } from '@modules/user/user.module';
import { PostgresModule } from './modules/database/postgres.module';

@Module({
	imports: [UserModule, EnvModule.register(), PostgresModule.register()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
