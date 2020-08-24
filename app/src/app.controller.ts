import { Controller, Get, Render } from '@nestjs/common';

@Controller('api/v1')
export class AppController {

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
