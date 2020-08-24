import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LandingPageModule } from './landing-page/landing-page.module';
import { DbModule } from './db/db.module';
import { EventsModule } from './events/events.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client/build'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DbModule,
    EventsModule,
    LandingPageModule,
    EventsModule,
    EmailModule,
    AuthModule,
    AccountsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}