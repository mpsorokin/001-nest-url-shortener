import { IsString } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  originalUrl: string;
}
