import { Controller, Post, Body, Res, UsePipes, ValidationPipe, UseGuards, Get, Param, Patch, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import { AuthService } from './auth.service';
import { GetMember } from './get-user.decorator';
import { Member } from './member.interface';
import { EmailDto } from './dto/email.dto';
import { Passw } from './dto/passw.dto';
import { AuthSignInCredentialsDto } from './dto/auth-signin-credentials.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() authCredentialsDto:AuthSignUpCredentialsDto, @Res() res: Response): Promise<Response> {
        return await this.authService.signUp(authCredentialsDto, res);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() authCredentialsDto:AuthSignInCredentialsDto, @Res() res: Response): Promise<Response> {
        return await this.authService.signIn(authCredentialsDto, res);
    }

    @Get('/member')
    @UseGuards(AuthGuard()) //AuthGuard default return property user
    authenticateByToken( 
        @GetMember() member:Member, 
        @Res() res: Response):Response {
            return this.authService.authenticateByToken(member, res);
        }

    @Get('/verify-email/:token')
    async verifyEmail( 
        @Param('token') token:string, @Res() res: Response):Promise<Response> {
            return await this.authService.verifyEmail(token, res);
        }  

    @Post('/signin-forgotten/')
    @UsePipes(ValidationPipe)
    async getPasswReset( 
        @Body() email:EmailDto, @Res() res: Response):Promise<Response> {
            return await this.authService.signInForgotten(email,res);
        }

    @Get('/signin-forgotten/:token')
    async showResetPassw( 
        @Param('token') token:string, @Res() res: Response):Promise<Response> {
            return await this.authService.showResetPassw(token, res);
        }

    @Patch('/signin-forgotten/:token')
    async resetPassw( 
        @Param('token') token:string, @Body() newPassw:Passw, @Res() res: Response ):Promise<Response> {
            return await this.authService.resetPassw(token, newPassw, res);
        } 
        
    }


    