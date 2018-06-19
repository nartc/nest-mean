import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): any {
    return {
      success: 200,
      data: 'Hello NestJS',
    };
  }
}
