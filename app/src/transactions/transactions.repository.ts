import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';

import { DbService } from '../db/db.service';
import {DatabaseResult, DbResponse} from '../db/db.interface';
import * as db from '../db/db.response.handler';
import { Member } from '../auth/member.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PatchTransactionDto } from './dto/patch-transaction.dto';


@Injectable()
export class TransactionsRepository {
    private logger = new Logger('TransactionsRepository');
    constructor(
        private readonly dbService: DbService,
    ) {};

    private pool = this.dbService.pool;

    async createTransaction(member:Member, dto:CreateTransactionDto): Promise<DbResponse> {

        const categoryId = dto.category_id ? dto.category_id : null;
        const transferDirection = dto.transfer_direction ? dto.transfer_direction : null;
        const balanceAccountId = dto.balance_account_id ? dto.balance_account_id : null;

        const query = {
            text: 'select * from app.cust_acc_transactions_create($1,$2,$3,$4,$5,$6,$7,$8,$9);',
            values: [
                member.customer_id,dto.description,dto.transaction_type_id,dto.amount,dto.date, dto.cust_account_id,
                categoryId,transferDirection,balanceAccountId
            ]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: createTransaction`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };
    
    async getTransactions(member:Member, accountId:number): Promise<DbResponse> {  
        const query = {
            text: 'select * from app.cust_account_balance_with_transactions($1,$2);',
            values: [member.customer_id,accountId]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: getTransactions`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async updateTransaction(member:Member, dto:PatchTransactionDto): Promise<DbResponse> {
        
        const categoryId = dto.category_id ? dto.category_id : null;
        const transferDirection = dto.transfer_direction ? dto.transfer_direction : null;

        const query = {
            text: 'select * from app.cust_acc_transactions_update($1,$2,$3,$4,$5,$6,$7);',
            values: [
                member.customer_id,
                dto.id,
                dto.description,
                dto.amount,
                dto.date, 
                categoryId,
                transferDirection,
            ]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: updateTransaction`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    async deleteTransaction(member:Member,transactionId:number): Promise<DbResponse> {  
        const query = {
            text: 'select * from app.cust_acc_transactions_delete($1,$2);',
            values: [member.customer_id,transactionId]
        };
        return this.pool.query(query)
        .then( (response:DatabaseResult) => {
            const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
            return result;
        })
        .catch( (error:any) =>{
            this.logger.error(`Failed repository: deleteTransaction`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        });
    };

    // async getTransactionTypesForTransaction(member:Member,accountId:number): Promise<DbResponse> {  
    //     const query = {
    //         text: 'select * from app.cust_accounts_get_transaction_types($1,$2);',
    //         values: [member.customer_id,accountId]
    //     };
    //     return this.pool.query(query)
    //     .then( (response:DatabaseResult) => {
    //         const result:DbResponse = db.handleDbResponse(response, "member id: " + member.id + " " + query.text);
    //         return result;
    //     })
    //     .catch( (error:any) =>{
    //         this.logger.error(`Failed repository: getTransactionTypesForTransaction`, error.stack);
    //         if (!error.status) {
    //             throw new InternalServerErrorException({message: e_500});
    //         }
    //         throw error;
    //     });
    // };

    private convertBooleanStr = (strBoolean:string):boolean => {
        return strBoolean.toLowerCase() === 'true' ? true : false;
    };
}
