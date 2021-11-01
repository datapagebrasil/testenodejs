import {
  Controller,
  Get,
  StreamableFile,
  Response,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('arquivos/arquivo.xlsx')
  getExcelFile(
    @Response({ passthrough: true }) res,
  ): StreamableFile {
    const excel = this.appService.downloadFile();
    res.set({
      'Content-Type': 'application/vnd.ms-excel',
      'Content-Disposition': `attachment; filename="arquivo.xlsx"`,
    });
    return new StreamableFile(excel);
  }
}
