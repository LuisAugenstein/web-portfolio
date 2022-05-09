import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Adventure, AdventureDTO } from '@dnd-history/shared-interfaces';
import { AdventureService } from './adventure.service';

import { UpdateResult } from 'typeorm';
import { SessionService } from '@dnd-history/backend-session';

@Controller()
export class AdventureController {
  constructor(
    private readonly adventureService: AdventureService,
    private readonly sessionService: SessionService
  ) {}

  @Get('session/:sessionId/adventure')
  async getAdventures(
    @Param('sessionId') sessionId: number
  ): Promise<Adventure[]> {
    const session = await this.sessionService.findSession(sessionId, [
      'adventures',
    ]);
    return session.adventures;
  }

  @Post('session/:sessionId/adventure')
  async create(
    @Param('sessionId') sessionId: number,
    @Body() adventureDTO: AdventureDTO
  ): Promise<Adventure> {
    const session = await this.sessionService.findSession(sessionId);
    return this.adventureService.createAdventure(session, adventureDTO);
  }

  @Put('adventure/:adventureId')
  update(
    @Param('adventureId') adventureId: number,
    @Body() adventureDTO: AdventureDTO
  ): Promise<UpdateResult> {
    return this.adventureService.updateAdventure(adventureId, adventureDTO);
  }
}
