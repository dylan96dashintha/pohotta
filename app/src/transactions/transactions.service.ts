import { Injectable, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

import { TransactionsRepository } from './transactions.repository';
import { Member } from 'src/auth/member.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DbResponse, D } from '../db/db.interface';
import * as help from '../common/helper-methods';
import strings from './strings';
import { PatchTransactionDto } from './dto/patch-transaction.dto';

@Injectable()
export class TransactionsService {
    private logger = new Logger('TransactionsService');
    constructor(
        private readonly transactionsRepository: TransactionsRepository,
    ) {};

    async createTransaction(member:Member, dto:CreateTransactionDto, res:Response,): Promise<Response> {
        try {
            // Create
            const dbResponse:DbResponse = await this.transactionsRepository.createTransaction(member,dto);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: dbResponse.d
            });  
        } catch (error) {
            this.logger.error(`Failed service: createTransaction`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async getTransactions(member:Member, accountId:number, res:Response,): Promise<Response> {
        try {
            // Create account
            const dbResponse:DbResponse = await this.transactionsRepository.getTransactions(member,accountId);
            // Group by months / accounts types
            const data = this.groupByAccount(dbResponse.d);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: data
            });  
        } catch (error) {
            this.logger.error(`Failed service: getTransactions`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async updateTransaction(member:Member, dto:PatchTransactionDto, res:Response,): Promise<Response> {
        
        try {
            // Create account
            const dbResponse:DbResponse = await this.transactionsRepository.updateTransaction(member,dto);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: dbResponse.d
            });  
        } catch (error) {
            this.logger.error(`Failed service: updateTransaction`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async deleteTransaction(member:Member, transactionId:number, res:Response,): Promise<Response> {
        try {
            // Create account
            const dbResponse:DbResponse = await this.transactionsRepository.deleteTransaction(member,transactionId);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: dbResponse.d
            });  
        } catch (error) {
            this.logger.error(`Failed service: deleteTransaction`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    // Group data by month, account type and account
    private groupByAccount = (data: Array<D>) => { // https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d
        // console.log(data);
        if (data.length === 0) {
            return [];
        }
        
        // `data` is an array of objects, `key` is the key (or property accessor) to group by
        // reduce runs this anonymous function on each element of `data` (the `item` parameter, returning the `storage` parameter at the end
        const groupByKey = data.reduce( (storage, item) => {
            // get the first instance of the key by which we're grouping
            storage['months'] = storage['months'] || [];
            
            // Object.keys(storage).map( (key) => {console.log(key)});
            if (storage.hasOwnProperty('months')) {
                // Push months
                if(!help.findProp(storage.months,'month_label',item.month_label)) {
                    storage.months.push({
                        month_label: item.month_label,
                        account_id : item.acc_id,
                        account_type : item.acc_type_name,
                        name : item.acc_name,
                        sum : item.acc_sum,
                        sum_prev_m : item.acc_sum_prev_m,
                        vs: item.acc_vs_m,
                        prev_month_label: item.prev_month_label,
                        transaction_types : [], 
                        transactions: []
                    }); 
                }

                storage.months.map(month => {
                    // Push transaction_types
                    if (month.hasOwnProperty('transaction_types')) {
                        if (
                            month.month_label === item.month_label && 
                            !help.findProp(month.transaction_types,'id',item.trans_type_id)  && 
                            item.trans_type_id !== 5) { //5 = balance)
                                month.transaction_types.push({
                                    id : item.trans_type_id,
                                    name: item.trans_type_name,
                                    sum: item.trans_type_sum,
                                    account_id : item.acc_id,
                                });
                        }
                    }
                    // Push transactions
                    if (month.hasOwnProperty('transactions')) {
                        if (month.month_label === item.month_label && !help.findProp(month.transactions,'id',item.id)) {
                            console.log(item);
                            month.transactions.push({
                                id: item.id,
                                   description: item.description,
                                   date: item.date,
                                   amount: item.amount,
                                   trans_type_id : item.trans_type_id,
                                   trans_type_name : item.trans_type_name,
                                   created_by: item.created_by,
                                   account_id : item.acc_id,
                            });
                        }
                    }
                });
            }
            // return the updated storage to the reduce function, which will then loop through the next
            return storage; 

        }, {} as {[key: string]: any}); // {} is the initial value of the storage, Todo return Array<CorrectType>

        // sort
        return help.sortByLabel(groupByKey.months,'month_label');;
    };
}
