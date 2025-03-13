import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'UTC',
    }).format(new Date())} \t ${entry}\n`;
    try {
      if(!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))){
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.txt'), formattedEntry);
        
    } catch (error) {
      if(error instanceof Error){
        console.log(error.message);
      }
    }
  }

  log(message: any, context?: string) {
    const entry = `${context} \t ${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: unknown, stackOrContext?: string | Record<string, any>): void {
    const entry = `${stackOrContext} \t ${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
