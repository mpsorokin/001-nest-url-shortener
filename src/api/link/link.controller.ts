import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { Authorization } from 'src/common/decorators/authorization.decorator';
import { CreateLinkDto } from './dto/create-link.dto';
import { Authorized } from '../../common/decorators/authorized.decorator';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Authorization()
  @Post()
  async createLink(@Body() dto: CreateLinkDto, @Authorized('id') id: string) {
    return await this.linkService.createLink(dto, id);
  }

  @Authorization()
  @Delete(':id')
  async deleteLink(@Param('id') id: string) {
    return await this.linkService.deleteLink(id);
  }
}
