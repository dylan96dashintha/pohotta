import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';

import { DbService } from '../db/db.service';
import {DatabaseResult, DbResponse} from '../db/db.interface';
import * as db from '../db/db.response.handler';
import { Member } from '../auth/member.interface';
import { CreateAccountWithBalanceDto } from './dto/create-account-with-balance.dto';
import { UpdateAccountDto } from './dto/update-account.dto';


@Injectable()
export class AccountsRepository {
    private logger = new Logger('AccountsRepository');
    constructor(
        private readonly dbService: DbService,
    ) {};

    private pool = this.dbService.pool;

    async getAccountTypes(member:Member): Promise<DbResponse> {  
        const query = {
            text: 'select * from app.account_types_get();',
            values: []
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: getAccountTypes`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async createAccount(member:Member, dto:CreateAccountWithBalanceDto): Promise<DbResponse> {  
        const isBalanceMode:boolean = this.convertBooleanStr(dto.is_balance_mode);
        const query = {
            text: 'select * from app.cust_accounts_create_with_balance($1,$2,$3,$4,$5,$6);',
            values: [member.customer_id,dto.description,isBalanceMode,dto.account_type_id,dto.date,dto.balance]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: createAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };
    
    async getAccounts(member:Member): Promise<DbResponse> {  
        const query = {
            text: 'select * from app.cust_accounts_get($1);',
            values: [member.customer_id]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: getAccounts`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async getOne(member:Member,accountId:number): Promise<DbResponse> {  
        const query = {
            text: 'select * from app.cust_accounts_get_one($1,$2);',
            values: [member.customer_id,accountId]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: getOneAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async getAllButOne(member:Member,accountId:number): Promise<DbResponse> {  
        const query = {
            text: 'select * from app.cust_accounts_get_all_but_one($1,$2);',
            values: [member.customer_id,accountId]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: getAllButOne`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async updateAccount(member:Member, dto:UpdateAccountDto): Promise<DbResponse> {  
        const isBalanceMode:boolean = this.convertBooleanStr(dto.is_balance_mode);
        const query = {
            text: 'select * from app.cust_accounts_update($1,$2,$3,$4);',
            values: [member.customer_id,dto.id, dto.description,isBalanceMode]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: updateAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async deleteAccount(member:Member,accountId:number): Promise<DbResponse> {  
        const query = {
            text: 'select * from app.cust_accounts_delete($1,$2);',
            values: [member.customer_id,accountId]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: deleteAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async getTransactionTypesForAccount(member:Member,accountId:number): Promise<DbResponse> {  
        const query = {
            text: 'select * from app.cust_accounts_get_transaction_types($1,$2);',
            values: [member.customer_id,accountId]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: getTransactionTypesForAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async getAccountsBalances(member:Member): Promise<DbResponse> {  
        const query = {
            text: 'select * from app.cust_accounts_get_all_balances($1);',
            values: [member.customer_id]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: getAccountsBalances`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    private convertBooleanStr = (strBoolean:string):boolean => {
        return strBoolean.toLowerCase() === 'true' ? true : false;
    };
}
