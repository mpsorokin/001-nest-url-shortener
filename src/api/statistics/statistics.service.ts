import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { UAParser } from 'ua-parser-js';
import { lookup } from 'geoip-country';

@Injectable()
export class StatisticsService {
  private readonly parser: UAParser;

  constructor(private readonly prismaService: PrismaService) {
    this.parser = new UAParser();
  }

  async getBrowserStats(id: string) {
    const clicks = await this.getClicks(id);

    const stats = clicks.reduce((acc, click) => {
      const { browser } = this.getBrowserByUserAgent(click.userAgent);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (acc[browser]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        acc[browser] += 1;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        acc[browser] = 1;
      }

      return acc;
    }, {});

    return stats;
  }

  private async getClicks(linkId: string) {
    const clicks = await this.prismaService.click.findMany({
      where: {
        linkId,
      },
    });

    return clicks;
  }

  private getBrowserByUserAgent(userAgent: string) {
    this.parser.setUA(userAgent);

    const result = this.parser.getResult();

    return { browser: result.browser };
  }

  private getCountryByIp(ip: string) {
    const geo = lookup(ip);
    console.log(geo);
  }
}
