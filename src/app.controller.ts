import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':code')
  async getLinkByShortCode(
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const link = await this.appService.getLinkByShortCode(code);

    return res.redirect(link.originalUrl);
  }
}
