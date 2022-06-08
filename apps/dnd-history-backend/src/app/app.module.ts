import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { SessionModule } from '@dnd-history/backend-session';
import { AdventureEntity, MapEntity, PinConnectionEntity, PinPointEntity, SessionEntity } from '@dnd-history/backend-entities';
import { AdventureModule } from '@dnd-history/backend-adventure';
import { MapModule} from '@dnd-history/backend-map';
import { PinPointModule } from '@dnd-history/backend-pin-point';
import { PinConnectionModule } from '@dnd-history/backend-pin-connection';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.typeOrmModuleOptions,
      entities: [SessionEntity, AdventureEntity, MapEntity, PinPointEntity, PinConnectionEntity],
    }),
    SessionModule,
    AdventureModule,
    MapModule,
    PinPointModule,
    PinConnectionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
