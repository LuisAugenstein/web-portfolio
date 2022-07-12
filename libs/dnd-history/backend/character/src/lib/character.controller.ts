import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Character } from '@dnd-history/shared-interfaces';
import { SessionService } from '@dnd-history/backend-session';
import { CharacterService } from './character.service';

@Controller()
export class CharacterController {
  constructor(
    private readonly characterService: CharacterService,
    private readonly sessionService: SessionService
  ) {}

  @Get('characters')
  async read(@Query('sessionId') sessionId: string): Promise<Character[]> {
    const session = await this.sessionService.find(sessionId, ['characters']);
    return session.characters;
  }

  @Post('character')
  async create(
    @Query('sessionId') sessionId: string,
    @Body() character: Character
  ): Promise<Character> {
    const session = await this.sessionService.find(sessionId);
    return this.characterService.create(session, character);
  }

  @Put('character/:characterId')
  async update(
    @Param('characterId') characterId: string,
    @Body() character: Character
  ): Promise<Character> {
    return this.characterService.update(characterId, character);
  }
}
