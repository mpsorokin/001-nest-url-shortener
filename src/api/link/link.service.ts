import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createLink(dto: CreateLinkDto, userId: string) {
    const { originalUrl } = dto;

    const shortCode = randomBytes(5).toString('hex');

    const link = await this.prismaService.link.create({
      data: {
        originalUrl,
        shortCode,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const shortUrl = `${this.configService.getOrThrow<string>('APP_URL')}/${shortCode}`;

    return { url: shortUrl };
  }

  async deleteLink(id: string) {
    const link = await this.prismaService.link.findUnique({
      where: { id },
    });

    if (!link) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }

    await this.prismaService.link.delete({
      where: { id },
    });

    return true;
  }
}
