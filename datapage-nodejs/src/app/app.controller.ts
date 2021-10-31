import { Controller, Get, StreamableFile, Response, Param } from '@nestjs/common';
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

  @Get('arquivos/:file')
  getExcelFile(@Param('file') fileName: string, @Response({ passthrough: true }) res): StreamableFile {
    const excel = this.appService.downloadFile(fileName);
    res.set({
      'Content-Type': fileName.endsWith(".xlsx") ? 'application/vnd.ms-excel' : 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });
    return new StreamableFile(excel);
  }
}
