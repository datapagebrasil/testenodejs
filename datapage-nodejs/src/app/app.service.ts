import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadStream, createReadStream } from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Teste NodeJS';
  }

  downloadFile(fileName: string): ReadStream {
    const ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (!['xlsx', 'pdf'].includes(ext)) {
      throw new NotFoundException('Arquivo solicitado não existe');
    }
    const filePath = path.join(
      __dirname,
      '..',
      'resources',
      'arquivos',
      fileName,
    );
    const file = createReadStream(filePath);
    return file;
  }
}
