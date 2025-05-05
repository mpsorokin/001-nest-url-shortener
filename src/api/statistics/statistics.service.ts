import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prismaService: PrismaService) {}

  private async getClicks(linkId: string) {
    const clicks = await this.prismaService.click.findMany({
      where: {
        linkId,
      },
    });

    return clicks;
  }
}
