import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './infra/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getLinkByShortCode(shortCode: string) {
    const link = await this.prismaService.link.findUnique({
      where: { shortCode },
    });

    if (!link) {
      throw new NotFoundException(`Link with shortCode ${shortCode} not found`);
    }

    return link;
  }
}
