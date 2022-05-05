import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SessionService } from './session.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SessionService],
})
export class AppModule {}
