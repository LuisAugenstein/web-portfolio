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
  async read(
    @Param('sessionId') sessionId: number
  ): Promise<Adventure[]> {
    const session = await this.sessionService.find(sessionId, [
      'adventures',
    ]);
    return session.adventures;
  }

  @Post('session/:sessionId/adventure')
  async create(
    @Param('sessionId') sessionId: number,
    @Body() adventureDTO: AdventureDTO
  ): Promise<Adventure> {
    const session = await this.sessionService.find(sessionId);
    return this.adventureService.create(session, adventureDTO);
  }

  @Put('adventure/:adventureId')
  update(
    @Param('adventureId') adventureId: number,
    @Body() adventureDTO: AdventureDTO
  ): Promise<UpdateResult> {
    return this.adventureService.update(adventureId, adventureDTO);
  }
}
