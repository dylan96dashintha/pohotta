import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import { MembersRepository } from './members.repository';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
    }),
    // register asyc to use env variables: https://stackoverflow.com/questions/55673424/nestjs-unable-to-read-env-variables-in-module-files-but-able-in-service-files
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
      AuthService, 
      JwtStrategy, 
      EmailService, 
      MembersRepository
    ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
