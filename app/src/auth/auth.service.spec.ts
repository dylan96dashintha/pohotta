import {Test, TestingModule} from '@nestjs/testing';
import { UnauthorizedException, InternalServerErrorException, ConflictException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EventsService } from '../events/events.service';
import { EmailService } from '../email/email.service';
import { MembersRepository } from './members.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { authCredentialsDto, resolvedMemberResponse, member, resolvedNoMember } from './__mocks__/auth';


// Mock functions
const mockMembersRepository = () => ({
    createMember: jest.fn(),
    getMember: jest.fn(),
});

const mockEventsService = () => ({
    addEvent: jest.fn(),
});
const mockEmailService = () => ({
    sendWelcome: jest.fn(),
});

const res:any = {
    status: (code:number) => {
        res.statusCode = code;
        return res;
    },
    json: (value:{}) => {
        res.data = value;
        return res;
    },
    statusCode: 0,
    data: {}
};


describe('AuthService', () => {
    let authService;
    let memberRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PassportModule.register({defaultStrategy: 'jwt'}),
                JwtModule.register({
                    secretOrPrivateKey: 'secretKeyForTests',
                    signOptions: {
                      expiresIn: 3600,
                    },
                }),
            ], 
            providers: [
                AuthService,
                JwtStrategy,
                {provide: EventsService, useFactory: mockEventsService},
                {provide: EmailService, useFactory: mockEmailService},
                {provide: MembersRepository, useFactory: mockMembersRepository},
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        memberRepository = module.get<MembersRepository>(MembersRepository);
            
    });

    describe('signUp', () => {

        it('sign up succesfully', async () => {
            memberRepository.createMember.mockResolvedValue(resolvedMemberResponse);

            expect(memberRepository.createMember).not.toHaveBeenCalled();
            const result = await authService.signUp(authCredentialsDto,res);
            expect(memberRepository.createMember).toHaveBeenCalled();
            expect(result.data.statusCode).toEqual(201);
            expect(result.data.data).toEqual({ member_id: 1, customer_id: 1 });
        });

        it('sign up fails but no error from member repository', async () => {
            memberRepository.createMember.mockResolvedValue(resolvedNoMember);

            expect(memberRepository.createMember).not.toHaveBeenCalled();
            await expect(authService.signUp(authCredentialsDto,res)).rejects.toThrow();
        });

        it('sign up fails - 409', async () => {
            memberRepository.createMember.mockRejectedValue(new ConflictException());
            await expect(authService.signUp(authCredentialsDto,res)).rejects.toThrow(ConflictException);
        });

        it('sign up fails - 500', async () => {
            memberRepository.createMember.mockRejectedValue(new InternalServerErrorException());
            await expect(authService.signUp(authCredentialsDto,res)).rejects.toThrow(InternalServerErrorException);
        });

    });

    describe('getMemberDbResponse & parseMember', () => {

        it('getMemberDbResponse and parseMember successfully', async () => {
            memberRepository.getMember.mockResolvedValue(resolvedMemberResponse);

            expect(memberRepository.getMember).not.toHaveBeenCalled();
            const dbResponse = await authService.getMemberDbResponse(authCredentialsDto.email);
            expect(dbResponse.status).toEqual(201); //would be 200 but use same mock 
            const member = authService.parseMember(dbResponse);
            expect(member).toEqual( resolvedMemberResponse.d );
        });

        it('getMemberDbResponse fails', async () => {
            memberRepository.getMember.mockRejectedValue(new UnauthorizedException());

            expect(memberRepository.getMember).not.toHaveBeenCalled();
            await expect(authService.getMemberDbResponse(authCredentialsDto.email)).rejects.toThrow(UnauthorizedException);
            
        });

        it('parseMember fails', async () => {
            expect( () => authService.parseMember(resolvedNoMember)).toThrow(UnauthorizedException);      
        });

        
    });

    describe('validatePassw', () => {

        it('validatePassw successfully', async () => {
            const success = await authService.validatePassword(member, "Salasanana1!");
            expect(success).toEqual(true);
        });


        it('validatePassw failed', async () => {
            const success = await authService.validatePassword(member, "wrong passw");
            expect(success).toEqual(false);
        });
    });

    describe('getDynamicToken', () => {

        it('verifyEmail successfully', async () => {
            memberRepository.getMember.mockResolvedValue(resolvedMemberResponse);

            const token = await authService.getDynamicToken(member.email, member.email +'_'+ member.updated_on);
            const verifiedMember = await authService.validateDynamicToken(token,'verify-email');
            expect(verifiedMember).toEqual(member);
        });

        it('resetPassw successfully', async () => {
            memberRepository.getMember.mockResolvedValue(resolvedMemberResponse);

            const token = await authService.getDynamicToken(member.email, member.passw);
            const verifiedMember = await authService.validateDynamicToken(token,'reset-passw');
            expect(verifiedMember).toEqual(member);
        });

        it('verifyEmail fail', async () => {
            memberRepository.getMember.mockResolvedValue(resolvedMemberResponse);

            const token = await authService.getDynamicToken(member.email, member.email +'_'+ 'fail');
            await expect(authService.validateDynamicToken(token,'verify-email')).rejects.toThrow(UnauthorizedException);  
        });

        it('resetPassw fail', async () => {
            memberRepository.getMember.mockResolvedValue(resolvedMemberResponse);

            const token = await authService.getDynamicToken(member.email, 'fail');
            await expect(authService.validateDynamicToken(token,'reset-passw')).rejects.toThrow(UnauthorizedException);  
        });

       


    });
});