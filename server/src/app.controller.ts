import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('root') // localhost:3000/root
export class AppController {
  constructor(private readonly appService: AppService) {}

  // router.get('/hello');
  // localhost:3000/root/hello
  @Get('hello')
  root(): any {
    return this.appService.root();
  }
}
