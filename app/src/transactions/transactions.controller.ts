import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Res, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';


import { GetMember } from '../auth/get-user.decorator';
import { Member } from 'src/auth/member.interface';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PatchTransactionDto } from './dto/patch-transaction.dto';

@Controller('api/v1/transactions')
@UseGuards(AuthGuard())
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

    @Post('/')
    @UsePipes(ValidationPipe)
    async createTransaction(
        @GetMember() member:Member,
        @Body() dto:CreateTransactionDto, @Res() res: Response) {
            return await this.transactionsService.createTransaction(member,dto,res);
    }
    
    @Get('/account/:id')
    async getTransactions(
        @Param('id', ParseIntPipe) accountId: number,
        @GetMember() member:Member, @Res() res: Response) {
            return await this.transactionsService.getTransactions(member, accountId, res);
        }
    
    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async updateAccount(
        @GetMember() member:Member,
        @Body() dto:PatchTransactionDto, @Res() res: Response) {
            return await this.transactionsService.updateTransaction(member,dto,res);
    }

    @Delete('/:id')
    async deleteAccount(
        @Param('id', ParseIntPipe) transactionId: number,
        @GetMember() member:Member,
        @Res() res: Response) {
            return await this.transactionsService.deleteTransaction(member,transactionId,res);
    }

}
