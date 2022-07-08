import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Adventure } from '@dnd-history/shared-interfaces';
import { AdventureService } from './adventure.service';
import { SessionService } from '@dnd-history/backend-session';

@Controller()
export class AdventureController {
  constructor(
    private readonly adventureService: AdventureService,
    private readonly sessionService: SessionService
  ) {}

  @Get('adventures')
  async read(
    @Query('sessionId') sessionId: string 
  ): Promise<Adventure[]> {
    const session = await this.sessionService.find(sessionId, [
      'adventures',
    ]);
    return session.adventures;
  }

  @Post('adventure')
  async create(
    @Query('sessionId') sessionId: string,
    @Body() adventure: Adventure
  ): Promise<Adventure> {
    const session = await this.sessionService.find(sessionId);
    return this.adventureService.create(session, adventure);
  }

  @Put('adventure/:adventureId')
  async update(
    @Param('adventureId') adventureId: string,
    @Body() adventure: Adventure
  ): Promise<Adventure> {
    return this.adventureService.update(adventureId, adventure);
  }
}
