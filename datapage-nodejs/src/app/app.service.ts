import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadStream, createReadStream } from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Teste NodeJS';
  }

  downloadFile(): ReadStream {
    const filePath = path.join(
      __dirname,
      '..',
      'resources',
      'arquivos',
      'arquivo.xlsx',
    );
    const file = createReadStream(filePath);
    return file;
  }
}
