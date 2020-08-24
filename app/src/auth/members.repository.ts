import { Injectable, Logger, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';

import { DbService } from '../db/db.service';
import {DatabaseResult, DbResponse} from '../db/db.interface';
import * as db from '../db/db.response.handler';


@Injectable()
export class MembersRepository {
    private logger = new Logger('MemberRepository');
    constructor(
        private readonly dbService: DbService,
    ) {};

    private pool = this.dbService.pool;

    async createMember(email:string, hashPassw:string, salt:string): Promise<DbResponse> {
        const query = {
            text: 'select * from app.members_create($1,$2,$3,$4);',
            values: [email,hashPassw,salt,email]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, email + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed: createMember`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async getMember(email:string):Promise<DbResponse> {
        const query = {
            text: 'select * from app.members_get($1);',
            values: [email]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result = db.handleDbResponse(response, email + " " + query.text);
            return result;
        })
        .catch( (error) =>{
            this.logger.error(`Failed to get member`, error.stack);
            throw new UnauthorizedException({message: 'e_unauthorized'});
        });
    };

    async updateMemberVerifyEmail(memberId:number,email:string):Promise<DbResponse> {
        const query = {
            text: 'select * from app.members_update_verify_email($1,$2);',
            values: [memberId, email]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const dbResponse:DbResponse = db.handleDbResponse(response, "member id: " + memberId + " " + query.text);
            return dbResponse;
        })
        .catch( (error) =>{
            this.logger.error(`Failed: updateMemberVerifyEmail`, error.stack);
            throw new UnauthorizedException({message: 'e_unauthorized'});
        });
    };

    async updateMemberResetPassw(memberId:number,email:string,newHashedPassw: string):Promise<DbResponse> {
        const query = {
            text: 'select * from app.members_update_reset_passw($1,$2,$3);',
            values: [memberId, email, newHashedPassw]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const dbResponse:DbResponse = db.handleDbResponse(response, "member id: " + memberId + " " + query.text);
            return dbResponse;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed: updateMemberResetPassw`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };
}
