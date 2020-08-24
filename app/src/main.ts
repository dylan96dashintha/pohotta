import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common'
import { AppModule } from './app.module';
import { join } from 'path';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AllExceptionsFilter } from './common/all-exception-filter';

const corsOptions = {
    "origin": [ 
        process.env.CLIENT_BASE_URL || 'https://pohatta.app',
        "http://localhost:3006"
    ],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials":true
  };

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const port = process.env.PORT || 3001;

  app.use(helmet());
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  app.enableCors(corsOptions);
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // limit each IP to 50 requests per windowMs, production use 50
    }),
  );
  //Return validation errors in Nestjs6 format: https://docs.nestjs.com/migration-guide
  app.useGlobalPipes(new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
    }
  ));

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
