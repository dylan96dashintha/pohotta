import { Injectable, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

import { AccountsRepository } from './accounts.repository';
import { Member } from '../auth/member.interface';
import { DbResponse, D } from '../db/db.interface';
import { CreateAccountWithBalanceDto } from './dto/create-account-with-balance.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import * as help from '../common/helper-methods'; 
import strings from './strings';

@Injectable()
export class AccountsService {
    private logger = new Logger('AccountsService');
    constructor(
        private readonly accountsRepository: AccountsRepository,
    ) {};

    async getAccountTypes(member:Member, res:Response,): Promise<Response> {
        try {
            // Get transaction types for account
            const dbResponse:DbResponse = await this.accountsRepository.getAccountTypes(member);
            // Convert to dropdown list
            const data = help.convertToDropdownList(dbResponse.d,'id','description');

            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: {
                    data
                }
            });  
        } catch (error) {
            this.logger.error(`Failed service: getAccountTypes`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async createAccount(member:Member, accountDto:CreateAccountWithBalanceDto, res:Response,): Promise<Response> {
        try {
            // Create account
            const dbResponse:DbResponse = await this.accountsRepository.createAccount(member,accountDto);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: dbResponse.d
            });  
        } catch (error) {
            this.logger.error(`Failed service: createAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async getAccounts(member:Member, res:Response,): Promise<Response> {
        try {
            // Get account
            const dbResponse:DbResponse = await this.accountsRepository.getAccounts(member);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: dbResponse.d
            });  
        } catch (error) {
            this.logger.error(`Failed service: getAccounts`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };


    async getAllButOne(member:Member,accountId:number,res:Response,): Promise<Response> {
        try {
            // Get balance accounts
            const dbResponse:DbResponse = await this.accountsRepository.getAllButOne(member,accountId);
            // Convert to dropdown list
            const data = help.convertToDropdownList(dbResponse.d,'id','description');
            
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: {data}
            });  
        } catch (error) {
            this.logger.error(`Failed service: getOneAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };


    async getOne(member:Member,accountId:number,res:Response,): Promise<Response> {
        try {
            // Create account
            const dbResponse:DbResponse = await this.accountsRepository.getOne(member,accountId);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: dbResponse.d
            });  
        } catch (error) {
            this.logger.error(`Failed service: getOneAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async updateAccount(member:Member, accountId:number, accountDto:UpdateAccountDto, res:Response,): Promise<Response> {
        
        if (accountId != accountDto.id) {
            throw new BadRequestException({message: strings.e_account_not_matching});
        }
        
        try {
            // Create account
            const dbResponse:DbResponse = await this.accountsRepository.updateAccount(member,accountDto);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: dbResponse.d
            });  
        } catch (error) {
            this.logger.error(`Failed service: updateAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async deleteAccount(member:Member, accountId:number, res:Response,): Promise<Response> {
        try {
            // Create account
            const dbResponse:DbResponse = await this.accountsRepository.deleteAccount(member,accountId);
            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: dbResponse.d
            });  
        } catch (error) {
            this.logger.error(`Failed service: deleteAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async getTransactionTypesForAccount(member:Member, accountId:number, res:Response,): Promise<Response> {
        try {
            // Get transaction types for account
            const dbResponse:DbResponse = await this.accountsRepository.getTransactionTypesForAccount(member,accountId);
            // Convert to dropdown list
            const data = help.convertToDropdownList(dbResponse.d,'id','description');

            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: {
                    data
                }
            });  
        } catch (error) {
            this.logger.error(`Failed service: getTransactionTypesForAccount`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    async getAccountsBalances(member:Member, res:Response,): Promise<Response> {
        try {
            // Get transaction types for account
            const dbResponse:DbResponse = await this.accountsRepository.getAccountsBalances(member);
            // Group by months / accounts types
            const data = this.groupByAccountTypes(dbResponse.d);

            // Response
            return res.status(dbResponse.status).json({
                message: dbResponse.msg, 
                statusCode: dbResponse.status,
                data: data
            });  
        } catch (error) {
            this.logger.error(`Failed service: getAccountsBalances`, error.stack);
            if (!error.status) {
                throw new InternalServerErrorException({message: 'e_500'});
            }
            throw error;
        }
    };

    // Group data by month, account type and account
    private groupByAccountTypes = (data: Array<D>) => { // https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d
        // console.log(data);

        if (data.length === 0) {
            return [];
        }
        
        // `data` is an array of objects, `key` is the key (or property accessor) to group by
        // reduce runs this anonymous function on each element of `data` (the `item` parameter, returning the `storage` parameter at the end
        const groupByKey = data.reduce( (storage, item) => {
            // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
            storage['months'] = storage['months'] || [];
            
            // Object.keys(storage).map( (key) => {console.log(key)});
            if (storage.hasOwnProperty('months')) {
                // Push months
                if(!help.findProp(storage.months,'month_label',item.month_label)) {
                    storage.months.push({
                        month_label: item.month_label,
                        sum : item.m_sum,
                        sum_prev_m : item.m_sum_prev_m,
                        vs: item.m_vs_m,
                        prev_month_label: item.prev_month_label,
                        account_types: [] //reference this in next level
                    }); 
                }
                // Push account_types
                storage.months.map(month => {
                    if (month.hasOwnProperty('account_types')) {
                        if (month.month_label === item.month_label && !help.findProp(month.account_types,'id',item.acc_type_id)) {
                            month.account_types.push({
                                id : item.acc_type_id,
                                name : item.acc_type_name,
                                sum : item.acc_type_sum,
                                sum_prev_m : item.acc_type_sum_prev_m,
                                vs: item.acc_type_vs_m,
                                prev_month_label: item.prev_month_label,
                                accounts : [] //reference this in next level
                            });
                        }
                    }
                    // Push accounts
                    month.account_types.map(account_type => {
                        if (account_type.hasOwnProperty('accounts')) {
                            if (account_type.id === item.acc_type_id && !help.findProp(account_type.accounts,'id',item.acc_id)) {
                                account_type.accounts.push({
                                    id : item.acc_id,
                                    name: item.acc_name,
                                    sum: item.account_sum,
                                    sum_prev_m: item.account_sum_prev_m,
                                    vs: item.acc_vs_m,
                                    prev_month_label: item.prev_month_label,
                                });
                            }
                        }
                    })
                });
            }
            // return the updated storage to the reduce function, which will then loop through the next
            return storage; 
        }, {} as {[key: string]: any}); // {} is the initial value of the storage, Todo return Array<CorrectType>
        
        // sort
        return help.sortByLabel(groupByKey.months,'month_label');
    };
}
