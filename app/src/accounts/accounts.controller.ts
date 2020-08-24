import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Res, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { GetMember } from '../auth/get-user.decorator';
import { Member } from 'src/auth/member.interface';
import { AccountsService } from './accounts.service';
import { CreateAccountWithBalanceDto } from './dto/create-account-with-balance.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('api/v1/accounts')
@UseGuards(AuthGuard())
export class AccountsController {
    constructor(private accountsService: AccountsService) {}

    @Post('/')
    @UsePipes(ValidationPipe)
    async createAccount(
        @GetMember() member:Member,
        @Body() accountDto:CreateAccountWithBalanceDto, @Res() res: Response) {
            return await this.accountsService.createAccount(member,accountDto,res);
    }
    
    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async updateAccount(
        @Param('id', ParseIntPipe) accountId: number,
        @GetMember() member:Member,
        @Body() accountDto:UpdateAccountDto, @Res() res: Response) {
            return await this.accountsService.updateAccount(member,accountId,accountDto,res);
        }

    @Delete('/:id')
    async deleteAccount(
        @Param('id', ParseIntPipe) accountId: number,
        @GetMember() member:Member,
        @Res() res: Response) {
            return await this.accountsService.deleteAccount(member,accountId,res);
        }

    @Get('/types')
    async getAccountTypes(
        @GetMember() member:Member, @Res() res: Response) {
            return await this.accountsService.getAccountTypes(member, res);
        }

    @Get('/balances/')
    async getAccountsBalances(
        @GetMember() member:Member, 
        @Res() res: Response) {
            return await this.accountsService.getAccountsBalances(member,res);
        }

    @Get('/:id/transaction-types')
    async getTransactionTypesForAccount(
        @Param('id', ParseIntPipe) accountId: number,
        @GetMember() member:Member, @Res() res: Response) {
            return await this.accountsService.getTransactionTypesForAccount(member,accountId,res);
        }

    @Get('/:id')
    async getOne(
        @Param('id', ParseIntPipe) accountId: number,
        @GetMember() member:Member, @Res() res: Response) {
            return await this.accountsService.getOne(member, accountId, res);
        }

    @Get('/balance-accounts/:id')
    async getAllButOne(
        @Param('id', ParseIntPipe) accountId: number,
        @GetMember() member:Member, @Res() res: Response) {
            return await this.accountsService.getAllButOne(member, accountId, res);
        }

    @Get('/')
    async getAccounts(
        @GetMember() member:Member, @Res() res: Response) {
            return await this.accountsService.getAccounts(member, res);
        }
}
