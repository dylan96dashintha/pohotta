import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload} from './auth.interface';
import { AuthService } from './auth.service';
import { Member } from './member.interface';
import { DbResponse } from '../db/db.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // private logger = new Logger('JwtStrategy');
    constructor(
        private readonly authService: AuthService,
        ) {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET || 'secretKeyForTests',
            });
        }
        
        // if secret is valid in constructor, then validate is called
        async validate(payload: JwtPayload): Promise<Member> {
        const { email } = payload;
        const dbResponse:DbResponse = await this.authService.getMemberDbResponse(email);
        const member:Member = this.authService.parseMember(dbResponse);
        // return the user to request.user (AuthGuard default)
        return member;
    }
}