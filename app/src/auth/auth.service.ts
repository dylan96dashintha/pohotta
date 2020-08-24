import { Injectable, Logger, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

import { EventsService } from '../events/events.service';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import { DbResponse } from '../db/db.interface';
import { JwtPayload, JwtResponse } from './auth.interface';
import strings from './strings';
import { EventType } from '../events/events.interface';
import { EmailService } from '../email/email.service';
import { EmailDto } from './dto/email.dto';
import { Passw } from './dto/passw.dto';
import { MembersRepository } from './members.repository';
import { Member } from './member.interface';
import { AuthSignInCredentialsDto } from './dto/auth-signin-credentials.dto';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        private readonly jwtService: JwtService,
        private readonly eventService: EventsService,
        private readonly emailService: EmailService,
        private readonly memberRepository: MembersRepository,
    ) {};

    async signUp(authCredentialsDto:AuthSignUpCredentialsDto, res:Response,): Promise<Response> {
        const salt = await bcrypt.genSalt(12); //20?
        const {email} = authCredentialsDto;
        const hashPassw = await this.hashPassword(authCredentialsDto.passw, salt);
        const tokenResponse = await this.getToken(email);

        try {
            // Create member
            const dbResponse:DbResponse = await this.memberRepository.createMember(email,hashPassw,salt);
            // Get member from response, throws error if there's no member 
            const member:Member = this.parseMember(dbResponse);
            // If member is created & found, create event
            this.eventService.addEvent({eventType: EventType.signup,trigger: 'sign-up',details: null,memberId: null});
            // If member is created & found, then send welcome email with verify email token
            const verifyEmailTokenReponse = this.getDynamicToken(member.email,member.email +'_'+ member.updated_on);
            this.emailService.sendWelcome(member.email,verifyEmailTokenReponse);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: {
                    member_id: member.id,
                    customer_id: member.customer_id
                },
                ...tokenResponse
            });  
        } catch (error) {
            this.logger.error(`Failed signUp`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async signIn(authCredentialsDto:AuthSignInCredentialsDto, res:Response): Promise<Response> {
        const {email, passw} = authCredentialsDto;
      
        try {
            const dbResponse:DbResponse = await this.getMemberDbResponse(email);
            const member:Member = this.parseMember(dbResponse);

            // Validate password
            if (!member || !await this.validatePassword(member, passw)) {
                this.logger.error(`Failed: signIn validate passw`, member.email);
                throw new UnauthorizedException({message: 'e_unauthorized'});
            }

            //Create eventService for usage metrics
            this.eventService.addEvent({eventType: EventType.signin,trigger: 'sign-in',details: 'sign-in-passw',memberId: member.id});

            //Response
            const tokenResponse = await this.getToken(email);
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: {
                    member_id: member.id,
                    customer_id: member.customer_id
                },
                ...tokenResponse
            });
        } catch (error) {
            this.logger.error(`Failed signIn`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    public authenticateByToken(member:Member, res: Response):Response {
        //Create eventService for usage metrics
        this.eventService.addEvent({eventType: EventType.signin,trigger: 'sign-in',details: 'sign-in-token',memberId: member.id});
        // console.log('auth', member);
        return res.status(200).json({
            message: strings.welcome_back, 
            statusCode: 200,
            data: {
                member_id: member.id,
                customer_id: member.customer_id
            },
        });
    };

    async signInForgotten(dto:EmailDto,res: Response):Promise<Response> {
        const {email} = dto;
        let result:DbResponse;
        let member:Member;
        let token:string;

        // Check if member is found
        try {
            result = await this.getMemberDbResponse(email);
            member = this.parseMember(result);
            token = this.getDynamicToken(email,member.passw);
        // Show success even if member is not found  
        } catch (error) {
            // Return without sending the email
            return res.status(200).json({
                message: strings.signInForgotten_sent, 
                statusCode: 200,
                data: {}
            });
        }

         // Send email
         try {
            // Send only if email is verified
            if (member.email_verified) {
                this.emailService.sendForgotten(email,token);
            }
            res.status(200).json({
                message: strings.signInForgotten_sent, 
                statusCode: 200,
                data: {}
            });
        } catch (error) {
            this.logger.error(`Failed signInForgotten`, email);
        }
    };

    async verifyEmail(token:string,res: Response):Promise<Response> {
        try {
            const member:Member = await this.validateDynamicToken(token,'verify-email');
            const dbResponse:DbResponse = await this.memberRepository.updateMemberVerifyEmail(member.id,member.email);
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: {
                    member_id: member.id,
                    customer_id: member.customer_id
                }
            });
        } catch (error) {
            this.logger.error(`Failed to get member`, error.stack);
            throw new UnauthorizedException({message: 'e_unauthorized'});
        }

    };

    async showResetPassw(token:string,res: Response):Promise<Response> {
        try {
            const member:Member = await this.validateDynamicToken(token,'reset-passw');
            return res.status(200).json({
                message: {}, 
                statusCode: 200,
                data: {
                    member_id: member.id,
                    customer_id: member.customer_id
                }
            });  
        } catch (error) {
            this.logger.error(`Failed: showResetPassw`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }  
    };

    async resetPassw(token:string,newPasswDto:Passw,res: Response):Promise<Response> {
        try {
            const member:Member = await this.validateDynamicToken(token,'reset-passw');
            const newHashPassw = await this.hashPassword(newPasswDto.newPassw, member.salt);
            const tokenResponse = await this.getToken(member.email);
            const dbResponse:DbResponse = await this.memberRepository.updateMemberResetPassw(member.id,member.email,newHashPassw);
            
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: {
                    member_id: member.id,
                    customer_id: member.customer_id
                },
                ...tokenResponse
            });
        } catch (error) {
            this.logger.error(`Failed: resetPassw`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    private async hashPassword(passw:string, salt:string):Promise<string> {
        return bcrypt.hash(passw,salt);
    };

    private async validatePassword(member:Member, passw:string):Promise<boolean> {
        const hash = await bcrypt.hash(passw,member.salt);
        return hash === member.passw;
    };

    // Returns status and message with member
    async getMemberDbResponse(email:string):Promise<DbResponse> {
        try {
            const dbResponse:DbResponse = await this.memberRepository.getMember(email);
            return dbResponse;
        } catch (error) {
            this.logger.error(`Failed to get member`, error.stack);
            throw new UnauthorizedException({message: 'e_unauthorized'});
        }
    };

    // Get member only from response of getMember()
    public parseMember(dbResponse:DbResponse):Member {
        const m = dbResponse.d[0]; // first should be member
        let member:Member;
        
         // Check if member was returned
         if ( dbResponse.status && (dbResponse.status === 200 || dbResponse.status === 201) && m.email) {
            member = {
                id: m.id,
                email: m.email,
                email_verified: m.email_verified,
                passw: m.passw,
                salt: m.salt,
                is_blocked: m.is_blocked,
                customer_id: m.customer_id,
                created_on: m.created_on,
                updated_on: m.updated_on
            }
        }
        // Check for member
        if (!member || !member.email) {
            this.logger.error(`Failed: parseMember`);
            throw new UnauthorizedException({message: 'e_unauthorized'});
        }
        return member;
    };

    private async getToken(email:string):Promise<JwtResponse> {
        const payload:JwtPayload = {email};
        const accessToken = await this.jwtService.signAsync(payload);
        const tokenData = await this.jwtService.verifyAsync(accessToken);
       
        const response:JwtResponse = {
            accessToken: accessToken,
            iat: tokenData.iat,
            exp: tokenData.exp
        }
        return response;
    };

    private getDynamicToken(email:string,secret:string){
        const payload:JwtPayload = {email};
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        return token;
    };

    public async validateDynamicToken(token:string,type:string):Promise<Member>{
        const decodedToken:any  = jwt.decode(token);

        if (!decodedToken.email) {
            throw new UnauthorizedException({message: 'e_unauthorized'});
        }

        //Use decoded token to get member email
        const dbResponse:DbResponse = await this.getMemberDbResponse(decodedToken.email);
        const member:Member = this.parseMember(dbResponse);

        // Verify email
        try {
            let secret; 
            if (type === 'verify-email') {
               secret = member.email +'_'+ member.updated_on;
            }
            if (type === 'reset-passw') {
                secret = member.passw;
            }
            
            // console.log('Decode token secret: ' + secret);
            var decoded = jwt.verify(token, secret);

            if (!decoded) {
                this.logger.error(`Failed to decode token`);
                throw new UnauthorizedException({message: 'e_unauthorized'});
            } else {
                return member;
            }

        } catch(error) {
            this.logger.error(`Failed to validate email token`, error.stack);
            throw new UnauthorizedException({message: 'e_unauthorized'});
        }
    };
}
